
import { db } from '../../src/db';
import { users, clinics, projects, posts } from '../../src/db/schema';
import { eq, sql, and } from 'drizzle-orm';
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    try {
        const clientsList = await db
            .select({
                id: clinics.id,
                userId: users.id,
                name: clinics.name,
                userName: users.email,
                email: users.email,
                role: users.role,
                clinicName: clinics.name,
                createdAt: users.createdAt,
                projectId: projects.id,
                projectStatus: projects.status,
                domainUrl: projects.domainUrl,
                monthlyFee: projects.monthlyFee,
                projectCreatedAt: projects.createdAt
            })
            .from(users)
            .innerJoin(clinics, eq(users.id, clinics.userId))
            .leftJoin(projects, eq(clinics.id, projects.clinicId))
            .where(eq(users.role, 'user')); // Filter by 'user' as per schema roleEnum

        // Enrich with required posts count
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        const monthYear = `${String(currentMonth).padStart(2, '0')}-${currentYear}`;

        const enrichedClients = await Promise.all(clientsList.map(async (client) => {
            if (!client.projectId) return { ...client, requiredPosts: 0, currentPosts: 0 };

            // 1. Calculate how many business days are needed this month
            const pCreatedAt = client.projectCreatedAt ? new Date(client.projectCreatedAt) : new Date();
            const launchDate = new Date(pCreatedAt);
            launchDate.setDate(launchDate.getDate() + 2);

            const isLaunchMonth = launchDate.getMonth() + 1 === currentMonth && launchDate.getFullYear() === currentYear;
            const isBeforeLaunchMonth = launchDate.getFullYear() > currentYear || (launchDate.getFullYear() === currentYear && launchDate.getMonth() + 1 > currentMonth);

            let required = 20;
            if (isBeforeLaunchMonth) {
                required = 0;
            } else if (isLaunchMonth) {
                // Count business days from launch to end of month
                let count = 0;
                const d = new Date(launchDate);
                while (d.getMonth() === currentMonth - 1) {
                    if (d.getDay() !== 0 && d.getDay() !== 6) count++;
                    d.setDate(d.getDate() + 1);
                }
                required = count;
            }

            // 2. Count current posts for this month
            const [postCount] = await db
                .select({ count: sql`count(*)` })
                .from(posts)
                .where(and(eq(posts.projectId, client.projectId), eq(posts.monthYear, monthYear)));

            return {
                ...client,
                requiredPosts: required,
                currentPosts: Number(postCount?.count || 0)
            };
        }));

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(enrichedClients));
    } catch (error) {
        console.error('Error fetching admin clients:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Erro ao buscar clientes' }));
    }
}
