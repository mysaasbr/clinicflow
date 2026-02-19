
import { db } from '../../src/db';
import { projects } from '../../src/db/schema';
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

    try {
        const { id, status, domainUrl, paymentStatus } = body;

        if (!id) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'ID do projeto é obrigatório' }));
            return;
        }

        const [updatedProject] = await db.update(projects)
            .set({
                status: status || undefined,
                domainUrl: domainUrl || undefined,
                paymentStatus: paymentStatus || undefined,
                updatedAt: new Date()
            })
            .where(eq(projects.id, id))
            .returning();

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, project: updatedProject }));

    } catch (error) {
        console.error('Error updating project:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Erro ao atualizar projeto' }));
    }
}
