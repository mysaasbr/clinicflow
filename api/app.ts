import type { IncomingMessage, ServerResponse } from 'http';

// App Handlers
import changesCheckStatus from './_handlers/changes/check-status';
import changesCreate from './_handlers/changes/create';
import onboardingComplete from './_handlers/onboarding/complete-onboarding';
import postsCreate from './_handlers/posts/create';
import postsDelete from './_handlers/posts/delete';
import postsList from './_handlers/posts/list';
import postsMonths from './_handlers/posts/months';
import postsUpdate from './_handlers/posts/update';
import projectsCreate from './_handlers/projects/create';
import projectsDelete from './_handlers/projects/delete';
import projectsList from './_handlers/projects/list';
import projectsUpdateStatus from './_handlers/projects/update-status';
import projectsUpdate from './_handlers/projects/update';
import settingsUpdateClinic from './_handlers/settings/update-clinic';

const handlers: Record<string, any> = {
    'changes/check-status': changesCheckStatus,
    'changes/create': changesCreate,
    'onboarding/complete-onboarding': onboardingComplete,
    'posts/create': postsCreate,
    'posts/delete': postsDelete,
    'posts/list': postsList,
    'posts/months': postsMonths,
    'posts/update': postsUpdate,
    'projects/create': projectsCreate,
    'projects/delete': projectsDelete,
    'projects/list': projectsList,
    'projects/update-status': projectsUpdateStatus,
    'projects/update': projectsUpdate,
    'settings/update-clinic': settingsUpdateClinic,
};

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const host = req.headers.host || 'localhost';
        const url = new URL(req.url || '/', `http://${host}`);
        const pathname = url.pathname;

        console.log(`[App Router] Request: ${req.method} ${pathname}`);

        const parts = pathname.split('/').filter(Boolean);
        if (parts[0] !== 'api') {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Not found' }));
            return;
        }

        const handlerPath = parts.slice(1).join('/');
        const exportedMember = handlers[handlerPath];

        if (exportedMember) {
            const handlerFunc = exportedMember.default || exportedMember;

            if (typeof handlerFunc !== 'function') {
                throw new Error(`Handler for ${handlerPath} is not a function`);
            }

            return await handlerFunc(req, res);
        } else {
            console.warn(`[App Router] Handler not found for ${pathname}`);
            res.statusCode = 404;
            res.end(JSON.stringify({ error: `Handler not found for path: ${handlerPath}` }));
        }
    } catch (error: any) {
        console.error(`[App Router] Fatal Error:`, error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            error: 'Internal Server Error',
            message: error.message,
            db_ready: !!process.env.DATABASE_URL
        }));
    }
}
