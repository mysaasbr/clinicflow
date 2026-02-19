import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    const bodyString = Buffer.concat(buffers).toString();

    let body;
    try {
        body = JSON.parse(bodyString);
    } catch (e) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
    }

    const { email, name, projectId } = body;

    if (!email || !projectId) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Email and ProjectID are required' }));
        return;
    }

    const ABACATE_API_KEY = process.env.ABACATEPAY_API_KEY;

    try {
        // According to AbacatePay docs, we create a billing (Cobranca)
        const response = await fetch('https://api.abacatepay.com/v1/billing/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ABACATE_API_KEY}`
            },
            body: JSON.stringify({
                frequency: 'ONE_TIME',
                methods: ['PIX'],
                amount: 5900, // R$ 59,00 in cents
                description: `Ativação Studio Profissional - ${name || 'ClinicFlow'}`,
                returnUrl: `${process.env.BASE_URL || 'https://clinicflow.me'}/dashboard`,
                completionUrl: `${process.env.BASE_URL || 'https://clinicflow.me'}/dashboard?success=true`,
                metadata: {
                    email: email,
                    projectId: projectId
                }
            })
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('AbacatePay Error:', result);
            res.statusCode = response.status || 500;
            res.end(JSON.stringify({ error: 'Erro ao criar sessão de pagamento', details: result }));
            return;
        }

        // Return the billing URL
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ url: result.data.url }));

    } catch (error) {
        console.error('Error creating AbacatePay session:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}
