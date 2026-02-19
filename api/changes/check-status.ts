
import { db } from '../../src/db';
import { changes, projects, clinics, users } from '../../src/db/schema';
import { eq, and, or, desc } from 'drizzle-orm';
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    try {
        const url = new URL(req.url!, `http://${req.headers.host}`);
        const userId = url.searchParams.get('userId');

        if (!userId) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'User ID is required' }));
            return;
        }

        // 1. Find User's Project
        const [userProject] = await db
            .select({
                projectId: projects.id,
                clinicName: clinics.name
            })
            .from(users)
            .innerJoin(clinics, eq(users.id, clinics.userId))
            .innerJoin(projects, eq(clinics.id, projects.clinicId))
            .where(eq(users.id, userId));

        if (!userProject) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Project not found' }));
            return;
        }

        // 2. Fetch Active Requests
        const activeRequests = await db
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
            )
            .orderBy(desc(changes.createdAt));

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            activeRequest: activeRequests.length > 0 ? activeRequests[0] : null
        }));

    } catch (error) {
        console.error('Error fetching status:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
}
