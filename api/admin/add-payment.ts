
import { db } from '../../src/db';
import { payments, projects } from '../../src/db/schema';
import { eq } from 'drizzle-orm';
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    try {
        const buffers = [];
        for await (const chunk of req) {
            buffers.push(chunk);
        }
        const rawBody = Buffer.concat(buffers).toString();

        const body = JSON.parse(rawBody);
        const { projectId, amount } = body;

        if (!projectId || !amount) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Project ID and amount are required' }));
            return;
        }

        // Verify project exists
        const [project] = await db.select().from(projects).where(eq(projects.id, projectId));
        if (!project) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Project not found' }));
            return;
        }

        // Insert payment
        const [newPayment] = await db.insert(payments).values({
            projectId,
            amount: amount, // Expected format e.g. "R$ 97,00"
            monthYear: body.monthYear || null,
            status: 'paid'
        }).returning();

        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, payment: newPayment }));

    } catch (error: any) {
        console.error('Error adding manual payment:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal Server Error', details: error.message }));
    }
}
