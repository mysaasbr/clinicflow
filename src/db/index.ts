import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// We make DB a getter to avoid top-level crashes if env var is missing during build/init
let _db: any = null;

export function getDb() {
    if (!_db) {
        const url = process.env.DATABASE_URL;
        if (!url) {
            throw new Error('DATABASE_URL is not defined in environment variables');
        }
        const sql = neon(url);
        _db = drizzle(sql, { schema });
    }
    return _db;
}

export const db = new Proxy({} as any, {
    get: (target, prop) => {
        return getDb()[prop];
    }
});
