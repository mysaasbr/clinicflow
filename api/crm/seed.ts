
import { db } from '../../src/db';
import { leads, projects, clinics, users } from '../../src/db/schema';
import { eq } from 'drizzle-orm';
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const url = new URL(req.url!, `http://${req.headers.host}`);
        const userId = url.searchParams.get('userId');
        let project;

        if (userId) {
            // Find the project for this user
            const [userProject] = await db.select({ id: projects.id })
                .from(users)
                .innerJoin(clinics, eq(users.id, clinics.userId))
                .innerJoin(projects, eq(clinics.id, projects.clinicId))
                .where(eq(users.id, userId));
            project = userProject;
        } else {
            // Just get the first project in the DB for quick seeding
            const [firstProject] = await db.select({ id: projects.id }).from(projects).limit(1);
            project = firstProject;
        }

        if (!project) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'No project found to seed' }));
            return;
        }

        const dummyLeads = [
            { projectId: project.id, name: 'Ricardo Silveira', phone: '11999887766', email: 'ricardo@exemplo.com', source: 'Hero CTA', status: 'new' },
            { projectId: project.id, name: 'Dra. Ana Paula', phone: '21988776655', email: 'ana.paula@exemplo.com', source: 'Funnel Section', status: 'contacted' },
            { projectId: project.id, name: 'Bruno Gomes', phone: '31977665544', email: 'bruno@exemplo.com', source: 'Hero CTA', status: 'scheduled' },
            { projectId: project.id, name: 'Mariana Costa', phone: '41966554433', email: 'mari@exemplo.com', source: 'FAQ Section', status: 'won' },
            { projectId: project.id, name: 'João Mendes', phone: '51955443322', email: 'joao@exemplo.com', source: 'Hero CTA', status: 'lost' },
        ];

        for (const lead of dummyLeads) {
            await db.insert(leads).values(lead as any);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, message: 'Leads seeded successfully' }));

    } catch (error) {
        console.error('Error seeding leads:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Erro ao semear leads' }));
    }
}
