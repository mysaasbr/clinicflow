import { db } from '../../../src/db';
import { users } from '../../../src/db/schema';
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
        for await (const chunk of req) buffers.push(chunk);
        const { email, password } = JSON.parse(Buffer.concat(buffers).toString());

        // 1. Find User
        const [user] = await db.select().from(users).where(eq(users.email, email));

        if (!user || user.passwordHash !== password) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Credenciais inválidas' }));
            return;
        }

        // 2. Return User Data
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            },
            token: 'fake-jwt-token-' + user.id
        }));

    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Erro interno do servidor' }));
    }
}

