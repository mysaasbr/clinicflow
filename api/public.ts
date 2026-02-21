import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    const host = req.headers.host || 'localhost';
    const body = {
        status: 'online',
        timestamp: new Date().toISOString(),
        url: req.url,
        host: host,
        env: {
            db_url_exists: !!process.env.DATABASE_URL,
            db_url_prefix: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 10) : 'none',
            node_version: process.version
        }
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body, null, 2));
}
