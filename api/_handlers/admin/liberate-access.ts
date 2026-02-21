
import { db } from '../../../src/db';
import { projects } from '../../../src/db/schema';
import { eq } from 'drizzle-orm';
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
    const { projectId } = body;

    if (!projectId) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Project ID is required' }));
        return;
    }

    try {
        // Force status to 'approved' and paymentStatus to 'paid'
        await db.update(projects)
            .set({
                status: 'approved',
                paymentStatus: 'paid',
                updatedAt: new Date()
            })
            .where(eq(projects.id, projectId));

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, message: 'Acesso liberado com sucesso!' }));
    } catch (error) {
        console.error('Error liberating access:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Erro ao liberar acesso manualmente' }));
    }
}

