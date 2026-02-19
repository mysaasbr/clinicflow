
import { db } from '../../src/db';
import { users, clinics, projects, posts, usageLogs, payments } from '../../src/db/schema';
import { eq, desc } from 'drizzle-orm';
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
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'User ID is required' }));
            return;
        }

        // 0. Log usage
        await db.insert(usageLogs).values({ userId }).catch(err => {
            console.error('Error logging usage:', err);
        });

        // 1. Get User/Clinic
        const [userClinic] = await db.select({
            userEmail: users.email,
            onboarded: users.onboarded,
            clinicId: clinics.id,
            clinicName: clinics.name,
            clinicPhone: clinics.phone,
            clinicInstagram: clinics.instagram,
            clinicCity: clinics.city,
            clinicAddress: clinics.address,
            projectStatus: projects.status,
            projectId: projects.id,
            monthlyFee: projects.monthlyFee,
            projectCreatedAt: projects.createdAt,
            userCreatedAt: users.createdAt
        })
            .from(users)
            .leftJoin(clinics, eq(users.id, clinics.userId))
            .leftJoin(projects, eq(clinics.id, projects.clinicId))
            .where(eq(users.id, userId));

        if (!userClinic) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'User not found' }));
            return;
        }

        // 2. Map project status to steps
        const status = userClinic.projectStatus || 'pending_payment';

        const siteSteps = [
            { step: 1, label: 'Briefing', status: status === 'pending_payment' ? 'current' : 'completed' },
            { step: 2, label: 'Design', status: status === 'approved' ? 'current' : (['in_progress', 'finished', 'published'].includes(status) ? 'completed' : 'pending') },
            { step: 3, label: 'Review', status: status === 'in_progress' ? 'current' : (['finished', 'published'].includes(status) ? 'completed' : 'pending') },
            { step: 4, label: 'Lançar', status: status === 'finished' ? 'current' : (status === 'published' ? 'completed' : 'pending') },
        ];

        // 3. Get last posts to determine content status (Mocking logic for content status for now)
        const contentSteps = [
            { step: 1, label: 'Pautas', status: 'completed' },
            { step: 2, label: 'Artes', status: 'current' },
            { step: 3, label: 'Aprovar', status: 'pending' },
            { step: 4, label: 'Postar', status: 'pending' },
        ];

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            clinic: {
                id: userClinic.clinicId,
                name: userClinic.clinicName,
                email: userClinic.userEmail,
                onboarded: userClinic.onboarded,
                phone: userClinic.clinicPhone,
                instagram: userClinic.clinicInstagram,
                city: userClinic.clinicCity,
                address: userClinic.clinicAddress,
            },
            project: {
                id: userClinic.projectId,
                status: status,
                monthlyFee: userClinic.monthlyFee || 'R$ 59,00',
                siteSteps,
                contentSteps,
                payments: userClinic.projectId ? await db.select().from(payments).where(eq(payments.projectId, userClinic.projectId)).orderBy(desc(payments.createdAt)) : [],
                createdAt: userClinic.projectCreatedAt || userClinic.userCreatedAt
            }
        }));

    } catch (error) {
        console.error('Error in dashboard overview:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Erro ao carregar dashboard' }));
    }
}
