
import { db } from '../../../src/db';
import { users, clinics, projects, posts } from '../../../src/db/schema';
import { eq, sql, and } from 'drizzle-orm';
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    try {
        const url = new URL(req.url!, `http://${req.headers.host}`);
        const projectId = url.searchParams.get('projectId');
        const month = url.searchParams.get('month'); // format: MM-YYYY

        if (!projectId) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Project ID is required' }));
            return;
        }

        const conditions = [eq(posts.projectId, projectId)];
        if (month) {
            conditions.push(eq(posts.monthYear, month));
        }

        // 1. Get project creation date to calculate launch date
        const [projectData] = await db
            .select({ createdAt: projects.createdAt })
            .from(projects)
            .where(eq(projects.id, projectId));

        const createdAt = projectData ? new Date(projectData.createdAt) : new Date();
        // Site delivery is 2 days after creation
        const launchDate = new Date(createdAt);
        launchDate.setDate(launchDate.getDate() + 2);

        const postsList = await db
            .select()
            .from(posts)
            .where(and(...conditions));

        // Use custom logic for business days
        const [targetMonth, targetYear] = (month || '02-2026').split('-').map(Number);

        // Check if we are in the launch month
        const isLaunchMonth = launchDate.getMonth() + 1 === targetMonth && launchDate.getFullYear() === targetYear;

        // Helper to check if a day is business day (Mon-Fri)
        const isBusinessDay = (d: Date) => d.getDay() !== 0 && d.getDay() !== 6;

        let businessDays: Date[] = [];
        const date = new Date(targetYear, targetMonth - 1, 1);
        while (date.getMonth() === targetMonth - 1) {
            // If it's launch month, only count days after or on launch date
            if (isBusinessDay(date)) {
                if (!isLaunchMonth || date >= launchDate) {
                    businessDays.push(new Date(date));
                }
            }
            date.setDate(date.getDate() + 1);
        }

        // Map to frontend format
        const formattedPosts = postsList.map((p, index) => {
            const mFullNames: Record<number, string> = {
                1: 'Janeiro', 2: 'Fevereiro', 3: 'Março', 4: 'Abril',
                5: 'Maio', 6: 'Junho', 7: 'Julho', 8: 'Agosto',
                9: 'Setembro', 10: 'Outubro', 11: 'Novembro', 12: 'Dezembro'
            };

            const mNames: Record<number, string> = {
                1: 'JAN', 2: 'FEV', 3: 'MAR', 4: 'ABR',
                5: 'MAI', 6: 'JUN', 7: 'JUL', 8: 'AGO',
                9: 'SET', 10: 'OUT', 11: 'NOV', 12: 'DEZ'
            };

            // Map post index to business day
            const assignedDay = businessDays[index];
            const dayNum = assignedDay ? assignedDay.getDate().toString().padStart(2, '0') : '??';
            const fullDate = assignedDay ? `${assignedDay.getFullYear()}-${String(assignedDay.getMonth() + 1).padStart(2, '0')}-${dayNum}` : '';

            return {
                id: p.id,
                title: p.captionText?.split('\n')[0].substring(0, 40) || `Post ${index + 1}`,
                image: p.imageUrl,
                caption: p.captionText,
                date: assignedDay ? `${dayNum} de ${mFullNames[targetMonth]}` : 'Sem data',
                dayNum: dayNum,
                monthName: mNames[targetMonth],
                fullDate: fullDate, // For calendar integration
                status: p.status || 'draft'
            };
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(formattedPosts));

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Erro ao buscar posts' }));
    }
}

