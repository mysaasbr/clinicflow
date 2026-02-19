
import { db } from '../../src/db';
import { leads } from '../../src/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'GET' && req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    try {
        if (req.method === 'GET') {
            const url = new URL(req.url!, `http://${req.headers.host}`);
            const projectId = url.searchParams.get('projectId');

            if (!projectId) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Project ID is required' }));
                return;
            }

            const result = await db.select()
                .from(leads)
                .where(eq(leads.projectId, projectId))
                .orderBy(desc(leads.createdAt));

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        }

        if (req.method === 'POST') {
            // This is for updating lead status or other fields
            let body = '';
            for await (const chunk of req) {
                body += chunk;
            }
            const { id, status, value } = JSON.parse(body);

            if (!id) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Lead ID is required' }));
                return;
            }

            await db.update(leads)
                .set({
                    ...(status && { status }),
                    ...(value && { value }),
                    updatedAt: new Date()
                })
                .where(eq(leads.id, id));

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
        }

    } catch (error) {
        console.error('Error in crm leads handler:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Erro no servidor CRM' }));
    }
}
