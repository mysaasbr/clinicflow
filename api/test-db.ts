import { getDb } from '../src/db/index';

export default async function handler(req: any, res: any) {
    try {
        console.log('[Test DB] Invoked');
        const dbReady = !!process.env.DATABASE_URL;

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            status: 'diagnostic',
            db_env_ready: dbReady,
            message: 'If you see this, the imports didn\'t crash the function.'
        }));
    } catch (error: any) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: error.message }));
    }
}
