import { db } from '../../src/db';
import { users } from '../../src/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // 1. Find User
        const [user] = await db.select().from(users).where(eq(users.email, email));

        if (!user || user.passwordHash !== password) {
            return new Response(JSON.stringify({ error: 'Credenciais inválidas' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 2. Return User Data
        return new Response(JSON.stringify({
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            },
            token: 'fake-jwt-token-' + user.id
        }), {
            status: 200,
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
