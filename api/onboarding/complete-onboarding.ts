
import { db } from '../../src/db';
import { users } from '../../src/db/schema';
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
    const bodyText = Buffer.concat(buffers).toString();

    if (!bodyText) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Empty body' }));
        return;
    }

    try {
        const { userId } = JSON.parse(bodyText);

        if (!userId) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'User ID is required' }));
            return;
        }

        await db.update(users)
            .set({ onboarded: true })
            .where(eq(users.id, userId));

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, message: 'Onboarding completed successfully' }));

    } catch (error) {
        console.error('Error completing onboarding:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}
