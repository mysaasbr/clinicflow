
import { db } from '../../../src/db';
import { posts } from '../../../src/db/schema';
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
        const { projectId, clinicId, month, imageUrl, caption } = body;

        if ((!projectId && !clinicId) || !month || !imageUrl) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Campos obrigatórios faltando (ID do Projeto ou Clínica)' }));
            return;
        }

        let finalProjectId = projectId;

        // If no projectId but we have clinicId, check if project exists or create one
        if (!finalProjectId && clinicId) {
            const { projects } = await import('../../../src/db/schema');
            const { eq } = await import('drizzle-orm');

            let [existingProject] = await db.select().from(projects).where(eq(projects.clinicId, clinicId));

            if (!existingProject) {
                [existingProject] = await db.insert(projects).values({
                    clinicId,
                    status: 'pending_payment',
                    paymentStatus: 'pending'
                }).returning();
            }
            finalProjectId = existingProject.id;
        }

        const [newPost] = await db.insert(posts).values({
            projectId: finalProjectId,
            monthYear: month,
            imageUrl,
            captionText: caption,
            status: 'draft'
        }).returning();

        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(newPost));

    } catch (error) {
        console.error('Error creating post:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Erro ao criar post' }));
    }
}

