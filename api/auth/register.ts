import { db } from '../../src/db';
import { users, clinics } from '../../src/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        // 1. Check if user exists
        const existingUser = await db.select().from(users).where(eq(users.email, email));

        if (existingUser.length > 0) {
            return new Response(JSON.stringify({ error: 'Email já cadastrado' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 2. Create User
        // In a real app we would hash the password here (e.g. bcrypt). 
        // For this MVP we act as if we did.
        const [newUser] = await db.insert(users).values({
            email,
            passwordHash: password, // TODO: Add hashing
            role: 'user'
        }).returning();

        // 3. Create placeholder Clinic for this user
        await db.insert(clinics).values({
            userId: newUser.id,
            name: name, // Using user name as placeholder clinic name initially
        });

        return new Response(JSON.stringify({
            user: {
                id: newUser.id,
                email: newUser.email,
                name: name,
                role: newUser.role
            },
            token: 'fake-jwt-token-' + newUser.id // Mock token for now
        }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Erro interno do servidor' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
