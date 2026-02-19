
import handler from './api/admin/client-details.ts';

async function test() {
    console.log('Testing handler import...');
    try {
        console.log('Handler type:', typeof handler);
        // We won't actually call it since we don't have mock req/res easily here without more setup
        console.log('Import successful!');
    } catch (e) {
        console.error('Import failed:', e);
    }
}

test();
