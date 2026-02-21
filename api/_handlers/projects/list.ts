
import { db } from '../../../src/db';
import { projects, clinics } from '../../../src/db/schema';
import { eq } from 'drizzle-orm';
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    try {
        const projectsList = await db
            .select({
                id: projects.id,
                clinicId: clinics.id,
                clinicName: clinics.name,
                domainUrl: projects.domainUrl,
                status: projects.status
            })
            .from(clinics)
            .leftJoin(projects, eq(clinics.id, projects.clinicId));

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(projectsList));
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Erro ao buscar projetos' }));
    }
}

