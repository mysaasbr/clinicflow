
import { db } from '../../src/db';
import { users, projects } from '../../src/db/schema';
import { eq, count, sql } from 'drizzle-orm';
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    try {
        // 1. Total Clients
        const [clientsCount] = await db.select({ value: count() }).from(users).where(eq(users.role, 'client'));

        // 2. Active Projects (not pending_payment)
        const [projectsCount] = await db.select({ value: count() }).from(projects).where(sql`${projects.status} != 'pending_payment'`);

        // 3. Total Revenue (Active clients * 97)
        // In a real app, we'd sum real payments, but per scope: "R$ 97 per client"
        const revenue = (clientsCount?.value || 0) * 97;

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            clients: clientsCount?.value || 0,
            projects: projectsCount?.value || 0,
            revenue: revenue
        }));
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Erro ao buscar estatísticas' }));
    }
}
