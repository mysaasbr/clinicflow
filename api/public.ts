import type { IncomingMessage, ServerResponse } from 'http';

// Public Handlers
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
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const pathname = url.pathname;

    const parts = pathname.split('/').filter(Boolean);
    if (parts[0] !== 'api') {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
    }

    const handlerPath = parts.slice(1).join('/');
    const handlerFunc = handlers[handlerPath];

    if (handlerFunc) {
        try {
            return await handlerFunc(req, res);
        } catch (error: any) {
            console.error(`Error executing handler for ${pathname}:`, error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal Server Error', details: error.message }));
        }
    } else {
        console.warn(`Handler not found for ${pathname}`);
        res.statusCode = 404;
        res.end(JSON.stringify({ error: `Handler not found for ${pathname}` }));
    }
}
