
import { db } from '../../../../src/db';
import { changes } from '../../../../src/db/schema';
import { eq } from 'drizzle-orm';
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    const body = JSON.parse(Buffer.concat(buffers).toString());
    const { id, status } = body;

    try {
        await db.update(changes)
            .set({
                status: status,
                updatedAt: new Date()
            })
            .where(eq(changes.id, id));

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true }));

    } catch (error) {
        console.error('Error updating status:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
}

