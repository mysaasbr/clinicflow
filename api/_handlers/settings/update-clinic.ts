
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

    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    const body = JSON.parse(Buffer.concat(buffers).toString());

    try {
        const { userId, clinicName, instagram, phone, address } = body;

        if (!userId) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'User ID is required' }));
            return;
        }

        // Update Clinic Info
        await db.update(clinics)
            .set({
                name: clinicName,
                instagram: instagram,
                phone: phone,
                address: address, // Saving to the new 'address' field
            })
            .where(eq(clinics.userId, userId));

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, message: 'Dados da clínica atualizados!' }));

    } catch (error) {
        console.error('Error updating clinic settings:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Erro ao salvar configurações' }));
    }
}

