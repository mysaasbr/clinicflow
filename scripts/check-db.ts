
import { db } from '../src/db';
import { users, clinics, projects, posts } from '../src/db/schema';
import { eq } from 'drizzle-orm';

async function check() {
    const email = 'devffelix@gmail.com';
    console.log(`Checking data for ${email}...`);

    const result = await db.select({
        userId: users.id,
        clinicId: clinics.id,
        clinicName: clinics.name,
        projectId: projects.id,
        projectStatus: projects.status,
        projectCreatedAt: projects.createdAt
    })
        .from(users)
        .leftJoin(clinics, eq(users.id, clinics.userId))
        .leftJoin(projects, eq(clinics.id, projects.clinicId))
        .where(eq(users.email, email));

    console.table(result);

    for (const row of result) {
        if (row.projectId) {
            const projectPosts = await db.select().from(posts).where(eq(posts.projectId, row.projectId));
            console.log(`Posts for project ${row.projectId}:`, projectPosts.length);
            projectPosts.forEach(p => console.log(`  - Post ${p.id}: ${p.monthYear}`));
        }
    }

    process.exit(0);
}

check();
