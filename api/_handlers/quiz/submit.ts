
import { db } from '../../../src/db';
import { users, clinics, projects } from '../../../src/db/schema';
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
        const { userId, clinicName, whatsapp, instagram, city, primaryColor, secondaryColor, fontStyle, brandVoice, marketingGoals, differentials, slogan, visualStyle } = body;

        if (!userId || !clinicName) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'User ID and Clinic Name are required' }));
            return;
        }

        // 1. Update Clinic
        let [clinic] = await db.select().from(clinics).where(eq(clinics.userId, userId));

        if (!clinic) {
            // Fallback if clinic doesn't exist (should have been created on register)
            [clinic] = await db.insert(clinics).values({
                userId,
                name: clinicName,
                phone: whatsapp,
                instagram,
                city,
                colors: { primary: primaryColor, secondary: secondaryColor },
                fonts: { primary: fontStyle, secondary: fontStyle },
                toneTags: brandVoice,
                marketingGoals,
                differentials,
                slogan,
                visualStyle
            }).returning();
        } else {
            [clinic] = await db.update(clinics)
                .set({
                    name: clinicName,
                    phone: whatsapp,
                    instagram,
                    city,
                    colors: { primary: primaryColor, secondary: secondaryColor },
                    fonts: { primary: fontStyle, secondary: fontStyle },
                    toneTags: brandVoice,
                    marketingGoals,
                    differentials,
                    slogan,
                    visualStyle
                })
                .where(eq(clinics.userId, userId))
                .returning();
        }

        // 2. Create Project (if not already exists for this clinic)
        let [project] = await db.select().from(projects).where(eq(projects.clinicId, clinic.id));

        if (!project) {
            [project] = await db.insert(projects).values({
                clinicId: clinic.id,
                status: 'pending_payment',
                paymentStatus: 'pending'
            }).returning();
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, clinicId: clinic.id, projectId: project.id }));

    } catch (error) {
        console.error('Error in quiz submission:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Erro ao processar onboarding' }));
    }
}

