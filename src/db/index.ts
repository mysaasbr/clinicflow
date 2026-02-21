import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

let _db: any = null;

export function getDb() {
    if (!_db) {
        const url = process.env.DATABASE_URL;
        if (!url) {
            throw new Error('DATABASE_URL is not defined in environment variables');
        }
        // Clean URL just in case (remove quotes if present)
        const cleanUrl = url.trim().replace(/^["']|["']$/g, '');
        const sql = neon(cleanUrl);
        _db = drizzle(sql, { schema });
    }
    return _db;
}

// We still export 'db' as a getter-only object for convenience, 
// but handlers should ideally use getDb() directly if they want to be safe.
export const db = {
    get select() { return getDb().select },
    get insert() { return getDb().insert },
    get update() { return getDb().update },
    get delete() { return getDb().delete },
    get query() { return getDb().query },
    get execute() { return getDb().execute },
    get transaction() { return getDb().transaction },
};
