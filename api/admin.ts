
import type { IncomingMessage, ServerResponse } from 'http';
import path from 'path';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const pathname = url.pathname;

    // Path looks like /api/admin/clients or /api/dashboard/overview
    // We want to map it to ./_handlers/admin/clients.ts or ./_handlers/dashboard/overview.ts

    const parts = pathname.split('/').filter(Boolean); // [api, admin, clients]
    if (parts[0] !== 'api') {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
    }

    // Reconstruction of the relative path to the handler
    // e.g. /api/admin/clients -> _handlers/admin/clients.ts
    const handlerPath = parts.slice(1).join('/'); // admin/clients

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
