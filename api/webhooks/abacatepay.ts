import { db } from '../../src/db';
import { users, clinics, projects, payments } from '../../src/db/schema';
import { eq } from 'drizzle-orm';
import type { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    const { query } = parse(req.url || '', true);
    const webhookSecret = query.webhookSecret;

    const EXPECTED_SECRET = process.env.ABACATEPAY_WEBHOOK_SECRET || 'abacate_secret_2026_clinic';

    // 1. Verify Secret from Query
    if (webhookSecret !== EXPECTED_SECRET) {
        console.warn('Unauthorized AbacatePay webhook attempt');
        res.statusCode = 401;
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
    }

    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    const bodyString = Buffer.concat(buffers).toString();

    let body;
    try {
        body = JSON.parse(bodyString);
    } catch (e) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
    }

    // AbacatePay payload: { "data": { "status": "CONFIRMED", "metadata": { "email": "..." }, ... } }
    const status = body.data?.status;
    const email = body.data?.metadata?.email;
    const amountInCents = body.data?.amount || 5900;

    // 2. Handle Confirmed/Paid Payment
    if (status === 'CONFIRMED' || status === 'PAID') {
        try {
            if (!email) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Customer email missing in metadata' }));
                return;
            }

            // 3. Find User and Project
            const [userWithProject] = await db.select({
                projectId: projects.id,
                userId: users.id
            })
                .from(users)
                .leftJoin(clinics, eq(users.id, clinics.userId))
                .leftJoin(projects, eq(clinics.id, projects.clinicId))
                .where(eq(users.email, email))
                .limit(1);

            if (!userWithProject || !userWithProject.projectId) {
                console.error(`Project not found for email: ${email}`);
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Project not found for this user email' }));
                return;
            }

            // 4. Update Project Status
            await db.update(projects)
                .set({
                    status: 'approved',
                    paymentStatus: 'approved',
                    updatedAt: new Date()
                })
                .where(eq(projects.id, userWithProject.projectId));

            // 5. Log Payment
            const now = new Date();
            const monthYear = `${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
            const amountFormatted = `R$ ${(amountInCents / 100).toFixed(2).replace('.', ',')}`;

            await db.insert(payments).values({
                projectId: userWithProject.projectId,
                amount: amountFormatted,
                monthYear: monthYear,
                status: 'paid'
            });

            console.info(`✓ AbacatePay: Payment approved and project activated for: ${email}`);

            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, message: 'Projeto ativado com sucesso' }));
            return;
        } catch (error) {
            console.error('Error processing AbacatePay webhook:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // Acknowledge other statuses
    res.statusCode = 200;
    res.end(JSON.stringify({ status: 'ignored', currentStatus: status }));
}
