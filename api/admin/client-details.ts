
import { db } from '../../src/db';
import { users, clinics, projects, posts, payments, usageLogs } from '../../src/db/schema';
import { eq, sql, and, desc } from 'drizzle-orm';
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    console.log('[API] Hit client-details handler');
    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    try {
        const url = new URL(req.url!, `http://${req.headers.host}`);
        const clinicId = url.searchParams.get('clinicId');
        console.log('[API] clinicId:', clinicId);

        if (!clinicId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(clinicId)) {
            console.error('[API] Invalid Clinic ID format:', clinicId);
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'ID de Clínica inválido' }));
            return;
        }

        // 1. Basic Info
        console.log('[API] Fetching basic info...');
        const [clientInfo] = await db
            .select({
                clinicId: clinics.id,
                userId: users.id,
                name: clinics.name,
                email: users.email,
                clinicName: clinics.name,
                createdAt: users.createdAt,
                projectId: projects.id,
                projectStatus: projects.status,
                domainUrl: projects.domainUrl,
                monthlyFee: projects.monthlyFee,
                projectCreatedAt: projects.createdAt,
                // Clinic Positioning & Visual Identity
                phone: clinics.phone,
                instagram: clinics.instagram,
                colors: clinics.colors,
                fonts: clinics.fonts,
                toneTags: clinics.toneTags,
                differentials: clinics.differentials,
                city: clinics.city,
                address: clinics.address
            })
            .from(clinics)
            .innerJoin(users, eq(clinics.userId, users.id))
            .leftJoin(projects, eq(clinics.id, projects.clinicId))
            .where(eq(clinics.id, clinicId));

        if (!clientInfo) {
            console.error('[API] Client not found for clinicId:', clinicId);
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Cliente não encontrado' }));
            return;
        }

        // 2. Post Stats
        const now = new Date();
        const monthYear = `${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

        let totalPostsCount = 0;
        let monthPostsCount = 0;
        let clientPayments: any[] = [];
        let totalPaid = 0;

        try {
            if (clientInfo.projectId) {
                // Total posts ever
                const [totalPosts] = await db
                    .select({ count: sql`count(*)` })
                    .from(posts)
                    .where(eq(posts.projectId, clientInfo.projectId));
                totalPostsCount = Number(totalPosts?.count || 0);

                // Posts this month
                const [monthPosts] = await db
                    .select({ count: sql`count(*)` })
                    .from(posts)
                    .where(and(
                        eq(posts.projectId, clientInfo.projectId),
                        eq(posts.monthYear, monthYear)
                    ));
                monthPostsCount = Number(monthPosts?.count || 0);

                // 3. Payments
                clientPayments = await db
                    .select()
                    .from(payments)
                    .where(eq(payments.projectId, clientInfo.projectId))
                    .orderBy(desc(payments.createdAt));

                totalPaid = clientPayments.reduce((sum, p) => {
                    // Try to parse "R$ 97,00" or similar
                    const numericValue = parseFloat(
                        p.amount
                            .replace('R$', '')
                            .replace(/\./g, '')
                            .replace(',', '.')
                            .trim()
                    ) || 0;
                    return sum + numericValue;
                }, 0);
            }
        } catch (e) {
            console.error('[API] Error fetching post/payment stats:', e);
            // Non-fatal, continue with zeros
        }

        // 4. Usage Metrics
        let usageStats = { totalLogins: 0, uniqueDays: 0 };
        try {
            const usage = await db
                .select({
                    totalAcessos: sql`count(*)`,
                    diasAtivos: sql`count(distinct date_trunc('day', ${usageLogs.timestamp}))`
                })
                .from(usageLogs)
                .where(eq(usageLogs.userId, clientInfo.userId));

            usageStats = {
                totalLogins: Number(usage[0]?.totalAcessos || 0),
                uniqueDays: Number(usage[0]?.diasAtivos || 0)
            };
        } catch (e) {
            console.error('[API] Error fetching usage stats:', e);
            // Non-fatal, continue with zeros
        }

        // Result
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            ...clientInfo,
            stats: {
                totalPosts: totalPostsCount,
                monthPosts: monthPostsCount,
                totalPayments: clientPayments.length,
                totalPaidValue: `R$ ${totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                usage: usageStats
            },
            payments: clientPayments
        }));

    } catch (error: any) {
        console.error('[API] CRITICAL ERROR in client-details:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Erro interno ao buscar detalhes', details: error.message }));
    }
}
