import type { IncomingMessage, ServerResponse } from 'http';

/**
 * LAZY-LOAD ROUTER - ADMIN
 */
export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const host = req.headers.host || 'localhost';
        const url = new URL(req.url || '/', `http://${host}`);
        const pathname = url.pathname;

        console.log(`[Admin Router] Request: ${req.method} ${pathname}`);

        const parts = pathname.split('/').filter(Boolean);
        if (parts[0] !== 'api') {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Not found' }));
            return;
        }

        const handlerPath = parts.slice(1).join('/');
        let handlerModule: any = null;

        switch (handlerPath) {
            case 'admin/add-payment':
                handlerModule = await import('./_handlers/admin/add-payment');
                break;
            case 'admin/changes/list':
                handlerModule = await import('./_handlers/admin/changes/list');
                break;
            case 'admin/changes/update-status':
                handlerModule = await import('./_handlers/admin/changes/update-status');
                break;
            case 'admin/client-details':
                handlerModule = await import('./_handlers/admin/client-details');
                break;
            case 'admin/clients':
                handlerModule = await import('./_handlers/admin/clients');
                break;
            case 'admin/create-manual-client':
                handlerModule = await import('./_handlers/admin/create-manual-client');
                break;
            case 'admin/get-settings':
                handlerModule = await import('./_handlers/admin/get-settings');
                break;
            case 'admin/liberate-access':
                handlerModule = await import('./_handlers/admin/liberate-access');
                break;
            case 'admin/stats':
                handlerModule = await import('./_handlers/admin/stats');
                break;
            case 'admin/subscriptions':
                handlerModule = await import('./_handlers/admin/subscriptions');
                break;
            case 'admin/update-client-fee':
                handlerModule = await import('./_handlers/admin/update-client-fee');
                break;
            case 'dashboard/overview':
                handlerModule = await import('./_handlers/dashboard/overview');
                break;
            default:
                console.warn(`[Admin Router] Path not mapped: ${handlerPath}`);
                res.statusCode = 404;
                res.end(JSON.stringify({ error: `Path not found: ${handlerPath}` }));
                return;
        }

        if (handlerModule) {
            const func = handlerModule.default || handlerModule;
            if (typeof func === 'function') {
                return await func(req, res);
            }
            throw new Error(`Handler exported from ${handlerPath} is not a function`);
        }

    } catch (error: any) {
        console.error(`[Admin Router] Runtime Error:`, error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            error: 'Internal Server Error',
            message: error.message,
            db_ready: !!process.env.DATABASE_URL
        }));
    }
}
