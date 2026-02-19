
import { db } from '../../src/db';
import { posts } from '../../src/db/schema';
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
        const data = JSON.parse(Buffer.concat(buffers).toString());
        const { postId } = data;

        if (!postId) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Post ID is required' }));
            return;
        }

        await db.delete(posts).where(eq(posts.id, postId));

        res.statusCode = 200;
        res.end(JSON.stringify({ success: true }));

    } catch (error) {
        console.error('Error deleting post:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Erro ao excluir post' }));
    }
}
