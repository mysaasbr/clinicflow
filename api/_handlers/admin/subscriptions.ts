
import { db } from '../../../src/db';
import { users, clinics, projects } from '../../../src/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    try {
        const subscriptions = await db
            .select({
                id: projects.id,
                clinicName: clinics.name,
                userEmail: users.email,
                status: projects.status,
                paymentStatus: projects.paymentStatus,
                updatedAt: projects.updatedAt,
                createdAt: projects.createdAt
            })
            .from(projects)
            .innerJoin(clinics, eq(projects.clinicId, clinics.id))
            .innerJoin(users, eq(clinics.userId, users.id))
            .orderBy(desc(projects.updatedAt));

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(subscriptions));
    } catch (error) {
        console.error('Error fetching admin subscriptions:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Erro ao buscar assinaturas' }));
    }
}

