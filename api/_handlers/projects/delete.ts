
import { db } from '../../../src/db';
import { projects, posts } from '../../../src/db/schema';
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
        const { id } = body;

        if (!id) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'ID do projeto é obrigatório' }));
            return;
        }

        // First delete related posts if any
        await db.delete(posts).where(eq(posts.projectId, id));

        // Then delete the project
        await db.delete(projects).where(eq(projects.id, id));

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true }));

    } catch (error) {
        console.error('Error deleting project:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Erro ao excluir projeto' }));
    }
}

