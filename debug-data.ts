
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './src/db/schema';
import { clinics, projects, users } from './src/db/schema';

const DATABASE_URL = "postgresql://neondb_owner:npg_cuIQzyXt2he7@ep-sweet-hall-aco21ttq-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);
const db = drizzle(sql, { schema });

import fs from 'fs';

async function checkData() {
    const allUsers = await db.select().from(users);
    const allClinics = await db.select().from(clinics);
    const allProjects = await db.select().from(projects);

    const result = {
        users: allUsers.map(u => ({ id: u.id, email: u.email, role: u.role })),
        clinics: allClinics.map(c => ({ id: c.id, name: c.name, userId: c.userId })),
        projects: allProjects.map(p => ({ id: p.id, clinicId: p.clinicId, status: p.status }))
    };

    fs.writeFileSync('data-dump.json', JSON.stringify(result, null, 2));
    console.log('✅ Data dumped to data-dump.json');
}

checkData().catch(console.error);
