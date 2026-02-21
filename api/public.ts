import type { IncomingMessage, ServerResponse } from 'http';

/**
 * LAZY-LOAD ROUTER
 * This router uses runtime dynamic imports to ensure the Vercel function can start 
 * even if some handlers have dependency issues.
 */
export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const host = req.headers.host || 'localhost';
        const url = new URL(req.url || '/', `http://${host}`);
        const pathname = url.pathname;

        console.log(`[Public Router] Request: ${req.method} ${pathname}`);

        const parts = pathname.split('/').filter(Boolean);
        if (parts[0] !== 'api') {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Not found' }));
            return;
        }

        const handlerPath = parts.slice(1).join('/');
        let handlerModule: any = null;

        // Dynamic mapping to ensure Vercel bundles the files but executes them only on demand
        switch (handlerPath) {
            case 'auth/login':
                handlerModule = await import('./_handlers/auth/login');
                break;
            case 'auth/register':
                handlerModule = await import('./_handlers/auth/register');
                break;
            case 'ai/improve-text':
                handlerModule = await import('./_handlers/ai/improve-text');
                break;
            case 'crm/collect':
                handlerModule = await import('./_handlers/crm/collect');
                break;
            case 'crm/leads':
                handlerModule = await import('./_handlers/crm/leads');
                break;
            case 'crm/seed':
                handlerModule = await import('./_handlers/crm/seed');
                break;
            case 'payments/create-session':
                handlerModule = await import('./_handlers/payments/create-session');
                break;
            case 'quiz/submit':
                handlerModule = await import('./_handlers/quiz/submit');
                break;
            case 'webhooks/abacatepay':
                handlerModule = await import('./_handlers/webhooks/abacatepay');
                break;
            case 'hello':
                res.end(JSON.stringify({ hello: 'world', mode: 'lazy' }));
                return;
            default:
                console.warn(`[Public Router] Path not mapped: ${handlerPath}`);
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
        console.error(`[Public Router] Runtime Error:`, error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            error: 'Internal Server Error',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            db_ready: !!process.env.DATABASE_URL
        }));
    }
}
