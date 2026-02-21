import { db } from '../../../src/db';
import { users, clinics } from '../../../src/db/schema';
import { eq } from 'drizzle-orm';
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    try {
        const { getDb } = await import('../../../src/db');
        const db = getDb();

        const buffers = [];
        for await (const chunk of req) buffers.push(chunk);
        const { name, email, password } = JSON.parse(Buffer.concat(buffers).toString());

        // 1. Check if user exists
        const existingUser = await db.select().from(users).where(eq(users.email, email));

        if (existingUser.length > 0) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Email já cadastrado' }));
            return;
        }

        // 2. Create User
        const [newUser] = await db.insert(users).values({
            email,
            passwordHash: password,
            role: 'user'
        }).returning();

        // 3. Create placeholder Clinic for this user
        await db.insert(clinics).values({
            userId: newUser.id,
            name: name,
        });

        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            user: {
                id: newUser.id,
                email: newUser.email,
                name: name,
                role: newUser.role
            },
            token: 'fake-jwt-token-' + newUser.id
        }));

    } catch (error: any) {
        console.error('Registration Error:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            error: 'Erro interno do servidor',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            db_connected: !!process.env.DATABASE_URL
        }));
    }
}

