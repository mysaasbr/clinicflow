
import { db } from '../../src/db';
import { posts, projects, clinics, users } from '../../src/db/schema';
import { eq, sql, count, and, ne, desc } from 'drizzle-orm';
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

        // 1. Get Clinic ID for this user
        const [userClinic] = await db.select({
            clinicId: clinics.id
        })
            .from(users)
            .innerJoin(clinics, eq(users.id, clinics.userId))
            .where(eq(users.id, userId));

        if (!userClinic) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Clinic not found' }));
            return;
        }

        // 2. Fetch all PROJECTS and check if they have posts with specific months
        const projectsWithPosts = await db
            .select({
                id: projects.id,
                createdAt: projects.createdAt,
                postCount: count(posts.id),
                // Get the first monthYear found in posts, if any
                firstPostMonth: sql<string>`(SELECT month_year FROM posts WHERE project_id = ${projects.id} LIMIT 1)`
            })
            .from(projects)
            .leftJoin(posts, eq(projects.id, posts.projectId))
            .where(
                and(
                    eq(projects.clinicId, userClinic.clinicId),
                    // Show all projects that are not pending payment
                    ne(projects.status, 'pending_payment')
                )
            )
            .groupBy(projects.id, projects.createdAt);

        const monthFullNames: Record<string, string> = {
            '01': 'Janeiro', '02': 'Fevereiro', '03': 'Março', '04': 'Abril',
            '05': 'Maio', '06': 'Junho', '07': 'Julho', '08': 'Agosto',
            '09': 'Setembro', '10': 'Outubro', '11': 'Novembro', '12': 'Dezembro'
        };

        const accents = [
            'from-blue-500 to-cyan-500',
            'from-indigo-500 to-purple-500',
            'from-emerald-500 to-teal-500',
            'from-amber-500 to-orange-500',
            'from-rose-500 to-pink-500'
        ];

        const formattedFolders = projectsWithPosts.map((p, index) => {
            let labelMonth = '';
            let labelYear = '';

            if (p.firstPostMonth) {
                const [m, y] = p.firstPostMonth.split('-');
                labelMonth = monthFullNames[m] || 'Mês';
                labelYear = y;
            } else {
                const date = p.createdAt || new Date();
                const m = (date.getMonth() + 1).toString().padStart(2, '0');
                labelMonth = monthFullNames[m];
                labelYear = date.getFullYear().toString();
            }

            return {
                id: p.id,
                name: labelMonth,
                count: Number(p.postCount),
                year: labelYear,
                accent: accents[index % accents.length]
            };
        });

        // Sort by creation date (newest first)
        formattedFolders.sort((a, b) => {
            const pA = projectsWithPosts.find(p => p.id === a.id);
            const pB = projectsWithPosts.find(p => p.id === b.id);
            return (pB?.createdAt?.getTime() || 0) - (pA?.createdAt?.getTime() || 0);
        });

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(formattedFolders));

    } catch (error) {
        console.error('Error fetching folders:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
}
