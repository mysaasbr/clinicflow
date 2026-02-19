import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, uuid, text, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';

// Define minimal schema needed for this script to avoid import issues
const roleEnum = pgEnum('role', ['user', 'admin']);

const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    role: roleEnum('role').default('user'),
    createdAt: timestamp('created_at').defaultNow(),
});

const DATABASE_URL = "postgresql://neondb_owner:npg_cuIQzyXt2he7@ep-sweet-hall-aco21ttq-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require";

const sql = neon(DATABASE_URL);
const db = drizzle(sql);

async function main() {
    console.log('🔍 Checking for existing admin user...');

    try {
        const existing = await db.select().from(users).where(eq(users.email, 'admin@clinicflow.com'));

        if (existing.length > 0) {
            console.log('⚠️  Admin user already exists.');
            return;
        }

        console.log('👤 Creating admin user...');
        await db.insert(users).values({
            email: 'admin@clinicflow.com',
            passwordHash: '123456',
            role: 'admin',
        });

        console.log('✅ Admin user created successfully!');
        console.log('📧 Email: admin@clinicflow.com');
        console.log('🔑 Password: 123456');

    } catch (error) {
        console.error('❌ Error creating admin:', error);
    }
}

main();
