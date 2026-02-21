import type { IncomingMessage, ServerResponse } from 'http';

/** 
 * DIAGNOSTIC LOGGING
 * This will show up in Vercel logs to help us see how far the execution gets.
 */
console.log('[Public Router] Module Initialized');

// Static imports
import aiImproveText from './_handlers/ai/improve-text';
import authLogin from './_handlers/auth/login';
import authRegister from './_handlers/auth/register';
import crmCollect from './_handlers/crm/collect';
import crmLeads from './_handlers/crm/leads';
import crmSeed from './_handlers/crm/seed';
import paymentsCreateSession from './_handlers/payments/create-session';
import quizSubmit from './_handlers/quiz/submit';
import webhooksAbacatepay from './_handlers/webhooks/abacatepay';

const handlers: Record<string, any> = {
    'ai/improve-text': aiImproveText,
    'auth/login': authLogin,
    'auth/register': authRegister,
    'crm/collect': crmCollect,
    'crm/leads': crmLeads,
    'crm/seed': crmSeed,
    'payments/create-session': paymentsCreateSession,
    'quiz/submit': quizSubmit,
    'webhooks/abacatepay': webhooksAbacatepay,
};

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    console.log(`[Public Router] Invoked: ${req.method} ${req.url}`);

    try {
        const host = req.headers.host || 'localhost';
        const url = new URL(req.url || '/', `http://${host}`);
        const pathname = url.pathname;

        const parts = pathname.split('/').filter(Boolean);
        if (parts[0] !== 'api') {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Not an API path' }));
            return;
        }

        const handlerPath = parts.slice(1).join('/');
        const handler = handlers[handlerPath];

        if (handler) {
            const func = handler.default || handler;
            if (typeof func === 'function') {
                return await func(req, res);
            }
            throw new Error(`Handler for ${handlerPath} is not a function`);
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: `Handler not found for: ${handlerPath}` }));
        }

    } catch (error: any) {
        console.error(`[Public Router] Fatal Error:`, error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            error: 'Internal Server Error',
            message: error.message,
            db_ready: !!process.env.DATABASE_URL,
            env_keys: Object.keys(process.env).filter(k => k.includes('DATABASE') || k.includes('API'))
        }));
    }
}
