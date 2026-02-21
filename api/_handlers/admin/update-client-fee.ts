
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

    try {
        let body = '';
        for await (const chunk of req) {
            body += chunk;
        }
        const { projectId, monthlyFee } = JSON.parse(body);

        if (!projectId || !monthlyFee) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Project ID and Monthly Fee are required' }));
            return;
        }

        await db.update(projects)
            .set({ monthlyFee })
            .where(eq(projects.id, projectId));

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true }));

    } catch (error) {
        console.error('Error updating client fee:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
}

