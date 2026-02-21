import type { IncomingMessage, ServerResponse } from 'http';

// Admin Handlers
import adminAddPayment from './_handlers/admin/add-payment';
import adminChangesList from './_handlers/admin/changes/list';
import adminChangesUpdateStatus from './_handlers/admin/changes/update-status';
import adminClientDetails from './_handlers/admin/client-details';
import adminClients from './_handlers/admin/clients';
import adminCreateManualClient from './_handlers/admin/create-manual-client';
import adminGetSettings from './_handlers/admin/get-settings';
import adminLiberateAccess from './_handlers/admin/liberate-access';
import adminStats from './_handlers/admin/stats';
import adminSubscriptions from './_handlers/admin/subscriptions';
import adminUpdateClientFee from './_handlers/admin/update-client-fee';
import dashboardOverview from './_handlers/dashboard/overview';

const handlers: Record<string, any> = {
    'admin/add-payment': adminAddPayment,
    'admin/changes/list': adminChangesList,
    'admin/changes/update-status': adminChangesUpdateStatus,
    'admin/client-details': adminClientDetails,
    'admin/clients': adminClients,
    'admin/create-manual-client': adminCreateManualClient,
    'admin/get-settings': adminGetSettings,
    'admin/liberate-access': adminLiberateAccess,
    'admin/stats': adminStats,
    'admin/subscriptions': adminSubscriptions,
    'admin/update-client-fee': adminUpdateClientFee,
    'dashboard/overview': dashboardOverview,
};

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const host = req.headers.host || 'localhost';
        const url = new URL(req.url || '/', `http://${host}`);
        const pathname = url.pathname;

        console.log(`[Admin Router] Request: ${req.method} ${pathname}`);

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
            console.warn(`[Admin Router] Handler not found for ${pathname}`);
            res.statusCode = 404;
            res.end(JSON.stringify({ error: `Handler not found for ${pathname}` }));
        }
    } catch (error: any) {
        console.error(`[Admin Router] Fatal Error:`, error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            error: 'Internal Server Error',
            message: error.message,
            db_ready: !!process.env.DATABASE_URL,
            path: req.url
        }));
    }
}
