
import { db } from '../../src/db';
import { users, clinics, projects } from '../../src/db/schema';
import { eq } from 'drizzle-orm';
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    try {
        const buffers = [];
        for await (const chunk of req) {
            buffers.push(chunk);
        }
        const body = JSON.parse(Buffer.concat(buffers).toString());
        const { name, email, password } = body;

        if (!name || !email || !password) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Nome, email e senha são obrigatórios' }));
            return;
        }

        // 1. Check if user exists
        const existingUser = await db.select().from(users).where(eq(users.email, email));

        if (existingUser.length > 0) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Email já cadastrado' }));
            return;
        }

        // 2. Create User, Clinic and Project
        // Create User
        const [newUser] = await db.insert(users).values({
            email,
            passwordHash: password, // In a real app we would hash this
            role: 'user'
        }).returning();

        // Create Clinic
        const [newClinic] = await db.insert(clinics).values({
            userId: newUser.id,
            name: name,
        }).returning();

        // Create Project (Approved and Paid)
        await db.insert(projects).values({
            clinicId: newClinic.id,
            status: 'approved',
            paymentStatus: 'paid',
        });

        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            success: true,
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newClinic.name,
                role: newUser.role
            }
        }));

    } catch (error) {
        console.error('Error creating manual client:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Erro interno ao criar cliente manualmente' }));
    }
}
