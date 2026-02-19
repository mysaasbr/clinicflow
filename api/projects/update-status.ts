
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
        const { projectId, status } = body;

        if (!projectId || !status) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Project ID and Status are required' }));
            return;
        }

        const [updatedProject] = await db.update(projects)
            .set({ status })
            .where(eq(projects.id, projectId))
            .returning();

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(updatedProject));

    } catch (error) {
        console.error('Error updating project status:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Erro ao atualizar status do projeto' }));
    }
}
