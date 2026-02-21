
import { db } from '../../../src/db';
import { projects } from '../../../src/db/schema';
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
    const body = JSON.parse(Buffer.concat(buffers).toString());

    try {
        const { clinicId, status, domainUrl } = body;

        if (!clinicId) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Clinic ID é obrigatório' }));
            return;
        }

        const [newProject] = await db.insert(projects).values({
            clinicId,
            status: status || 'pending_payment',
            domainUrl: domainUrl || null,
            paymentStatus: 'pending'
        }).returning();

        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, project: newProject }));

    } catch (error) {
        console.error('Error creating project:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Erro ao criar projeto' }));
    }
}

