import type { IncomingMessage, ServerResponse } from 'http';

// Static imports to force Vercel to bundle these files
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
        const exportedMember = handlers[handlerPath];

        if (exportedMember) {
            const func = exportedMember.default || exportedMember;
            if (typeof func === 'function') {
                return await func(req, res);
            }
            throw new Error(`Handler for ${handlerPath} is not a function`);
        } else {
            console.warn(`[Public Router] Path not found: ${handlerPath}`);
            res.statusCode = 404;
            res.end(JSON.stringify({ error: `Path not found: ${handlerPath}` }));
        }
    } catch (error: any) {
        console.error(`[Public Router] Runtime Error:`, error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            error: 'Internal Server Error',
            message: error.message,
            db_ready: !!process.env.DATABASE_URL
        }));
    }
}
