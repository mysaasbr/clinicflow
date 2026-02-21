import type { IncomingMessage, ServerResponse } from 'http';

/**
 * LAZY-LOAD ROUTER - APP
 */
export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const host = req.headers.host || 'localhost';
        const url = new URL(req.url || '/', `http://${host}`);
        const pathname = url.pathname;

        console.log(`[App Router] Request: ${req.method} ${pathname}`);

        const parts = pathname.split('/').filter(Boolean);
        if (parts[0] !== 'api') {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Not found' }));
            return;
        }

        const handlerPath = parts.slice(1).join('/');
        let handlerModule: any = null;

        switch (handlerPath) {
            case 'changes/check-status':
                handlerModule = await import('./_handlers/changes/check-status');
                break;
            case 'changes/create':
                handlerModule = await import('./_handlers/changes/create');
                break;
            case 'onboarding/complete-onboarding':
                handlerModule = await import('./_handlers/onboarding/complete-onboarding');
                break;
            case 'posts/create':
                handlerModule = await import('./_handlers/posts/create');
                break;
            case 'posts/delete':
                handlerModule = await import('./_handlers/posts/delete');
                break;
            case 'posts/list':
                handlerModule = await import('./_handlers/posts/list');
                break;
            case 'posts/months':
                handlerModule = await import('./_handlers/posts/months');
                break;
            case 'posts/update':
                handlerModule = await import('./_handlers/posts/update');
                break;
            case 'projects/create':
                handlerModule = await import('./_handlers/projects/create');
                break;
            case 'projects/delete':
                handlerModule = await import('./_handlers/projects/delete');
                break;
            case 'projects/list':
                handlerModule = await import('./_handlers/projects/list');
                break;
            case 'projects/update-status':
                handlerModule = await import('./_handlers/projects/update-status');
                break;
            case 'projects/update':
                handlerModule = await import('./_handlers/projects/update');
                break;
            case 'settings/update-clinic':
                handlerModule = await import('./_handlers/settings/update-clinic');
                break;
            default:
                console.warn(`[App Router] Path not mapped: ${handlerPath}`);
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
        console.error(`[App Router] Runtime Error:`, error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            error: 'Internal Server Error',
            message: error.message,
            db_ready: !!process.env.DATABASE_URL
        }));
    }
}
