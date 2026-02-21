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
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const pathname = url.pathname;

    const parts = pathname.split('/').filter(Boolean); // [api, admin, clients]
    if (parts[0] !== 'api') {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
    }

    const handlerPath = parts.slice(1).join('/');
    const handlerFunc = handlers[handlerPath];

    if (handlerFunc) {
        try {
            return await handlerFunc(req, res);
        } catch (error: any) {
            console.error(`Error executing handler for ${pathname}:`, error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal Server Error', details: error.message }));
        }
    } else {
        console.warn(`Handler not found for ${pathname}`);
        res.statusCode = 404;
        res.end(JSON.stringify({ error: `Handler not found for ${pathname}` }));
    }
}
