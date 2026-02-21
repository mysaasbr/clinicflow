
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    try {
        // Return only the public/safe settings
        const settings = {
            platformName: "ClinicFlow Studio",
            supportEmail: "suporte@clinicflow.com.br",
            caktoClientId: process.env.CAKTO_CLIENT_ID || '',
            // Do NOT send the secret to frontend
            hasCaktoSecret: !!process.env.CAKTO_CLIENT_SECRET,
            webhookUrl: "https://clinicflow-xi.vercel.app/api/webhooks/cakto",
            price: 97
        };

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(settings));
    } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Erro ao carregar configurações' }));
    }
}

