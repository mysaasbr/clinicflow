
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, uuid, text, pgEnum, timestamp, json } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';

// Define schema needed for this script
const roleEnum = pgEnum('role', ['user', 'admin']);
const projectStatusEnum = pgEnum('project_status', ['pending_payment', 'approved', 'in_progress', 'finished', 'published']);

const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    role: roleEnum('role').default('user'),
});

const clinics = pgTable('clinics', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    name: text('name').notNull(),
});

const projects = pgTable('projects', {
    id: uuid('id').defaultRandom().primaryKey(),
    clinicId: uuid('clinic_id').references(() => clinics.id).notNull(),
    status: projectStatusEnum('status').default('pending_payment'),
    domainUrl: text('domain_url'),
});

// Use env var or fallback to the one found in seed-admin.ts (hardcoded for now to match verified connectivity)
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_cuIQzyXt2he7@ep-sweet-hall-aco21ttq-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require";

const sql = neon(DATABASE_URL);
const db = drizzle(sql);

async function main() {
    console.log('🔍 Seeding Project...');

    try {
        // 1. Get or Create User
        let user = (await db.select().from(users).limit(1))[0];
        if (!user) {
            console.log('Creating test user...');
            [user] = await db.insert(users).values({
                email: 'test@clinicflow.com',
                passwordHash: '123456',
                role: 'user',
            }).returning();
        }
        console.log('User ID:', user.id);

        // 2. Get or Create Clinic
        let clinic = (await db.select().from(clinics).where(eq(clinics.userId, user.id)).limit(1))[0];
        if (!clinic) {
            console.log('Creating test clinic...');
            [clinic] = await db.insert(clinics).values({
                userId: user.id,
                name: 'Test Clinic',
            }).returning();
        }
        console.log('Clinic ID:', clinic.id);

        // 3. Get or Create Project
        let project = (await db.select().from(projects).where(eq(projects.clinicId, clinic.id)).limit(1))[0];
        if (!project) {
            console.log('Creating test project...');
            [project] = await db.insert(projects).values({
                clinicId: clinic.id,
                status: 'in_progress',
                domainUrl: 'test-clinic.com',
            }).returning();
        }
        console.log('Project ID:', project.id);
        console.log('✅ Setup complete!');

    } catch (error) {
        console.error('❌ Error seeding project:', error);
    }
}

main();
