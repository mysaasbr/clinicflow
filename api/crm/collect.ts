
import { db } from '../../src/db';
import { leads, projects } from '../../src/db/schema';
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
        const { projectId, name, email, phone, source } = JSON.parse(body);

        let finalProjectId = projectId;
        if (projectId === 'default-project-id') {
            const [firstProject] = await db.select({ id: projects.id }).from(projects).limit(1);
            if (firstProject) {
                finalProjectId = firstProject.id;
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'No project found to collect lead' }));
                return;
            }
        }

        if (!finalProjectId || !name) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Project ID and Name are required' }));
            return;
        }

        await db.insert(leads).values({
            projectId: finalProjectId,
            name,
            email: email || null,
            phone: phone || null,
            source: source || 'Direct',
            status: 'new'
        });

        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, message: 'Lead collected successfully' }));

    } catch (error) {
        console.error('Error in lead collection:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Erro ao coletar lead' }));
    }
}
