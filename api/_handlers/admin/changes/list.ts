
import { db } from '../../../../src/db';
import { changes, projects, clinics, users } from '../../../../src/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    try {
        const allChanges = await db
            .select({
                id: changes.id,
                projectId: changes.projectId,
                description: changes.description,
                status: changes.status,
                createdAt: changes.createdAt,
                clinicName: clinics.name,
                domainUrl: projects.domainUrl
            })
            .from(changes)
            .innerJoin(projects, eq(changes.projectId, projects.id))
            .innerJoin(clinics, eq(projects.clinicId, clinics.id))
            .orderBy(desc(changes.createdAt));

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(allChanges));

    } catch (error) {
        console.error('Error fetching admin changes:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
}

