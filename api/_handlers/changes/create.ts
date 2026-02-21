
import { db } from '../../../src/db';
import { changes, projects, clinics, users } from '../../../src/db/schema';
import { eq, and, or } from 'drizzle-orm';
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
    const { userId, description } = body;

    if (!userId || !description) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'User ID and description are required' }));
        return;
    }

    try {
        // 1. Find Project for User
        const [userProject] = await db
            .select({
                projectId: projects.id
            })
            .from(users)
            .innerJoin(clinics, eq(users.id, clinics.userId))
            .innerJoin(projects, eq(clinics.id, projects.clinicId))
            .where(eq(users.id, userId));

        if (!userProject) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Project not found for this user' }));
            return;
        }

        // 2. Check for active changes
        const activeChanges = await db
            .select()
            .from(changes)
            .where(
                and(
                    eq(changes.projectId, userProject.projectId),
                    or(
                        eq(changes.status, 'pending'),
                        eq(changes.status, 'in_progress')
                    )
                )
            );

        if (activeChanges.length > 0) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                error: 'Você já possui uma solicitação em andamento. Aguarde a conclusão antes de enviar outra.',
                activeRequest: activeChanges[0]
            }));
            return;
        }

        // 3. Create Change
        const [newChange] = await db.insert(changes).values({
            projectId: userProject.projectId,
            description,
            status: 'pending'
        }).returning();

        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, change: newChange }));

    } catch (error) {
        console.error('Error creating change request:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
}

