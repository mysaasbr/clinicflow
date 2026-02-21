
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const pathname = url.pathname;

    const parts = pathname.split('/').filter(Boolean);
    if (parts[0] !== 'api') {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
    }

    const handlerPath = parts.slice(1).join('/');

    try {
        const modulePath = `./_handlers/${handlerPath}.ts`;
        const { default: handler } = await import(modulePath);
        return await handler(req, res);
    } catch (error: any) {
        console.error(`Error loading handler for ${pathname}:`, error);
        res.statusCode = 404;
        res.end(JSON.stringify({ error: `Handler not found for ${pathname}` }));
    }
}
