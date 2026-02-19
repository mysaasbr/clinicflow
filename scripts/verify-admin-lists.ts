
const ports = [3000, 3001, 3002, 3003, 3004, 3005];

async function verify() {
    let baseUrl = '';

    console.log('Scanning ports for API...');
    for (const port of ports) {
        const url = `http://localhost:${port}/api/admin/clients`;
        try {
            const res = await fetch(url);
            const contentType = res.headers.get('content-type');
            if (res.ok && contentType && contentType.includes('application/json')) {
                console.log(`FOUND API at port ${port}`);
                baseUrl = `http://localhost:${port}`;
                break;
            }
        } catch (e) {
            // ignore
        }
    }

    if (!baseUrl) {
        console.error('Could not find running API on ports 3000-3005');
        return;
    }

    console.log('1. Fetching clients...');
    try {
        const res = await fetch(`${baseUrl}/api/admin/clients`);
        if (res.ok) {
            const data = await res.json();
            console.log('✅ Clients fetched:', data.length);
            if (data.length > 0) {
                console.log('Sample client:', data[0]);
            } else {
                console.log('⚠️ No clients found. Run seed script if needed.');
            }
        } else {
            console.error('❌ Failed to fetch clients:', res.status, res.statusText);
        }
    } catch (error) {
        console.error('❌ Error fetching clients:', error);
    }

    console.log('2. Fetching projects...');
    try {
        const res = await fetch(`${baseUrl}/api/projects/list`);
        if (res.ok) {
            const data = await res.json();
            console.log('✅ Projects fetched:', data.length);
            if (data.length > 0) {
                console.log('Sample project:', data[0]);
            }
        } else {
            console.error('❌ Failed to fetch projects:', res.status, res.statusText);
        }
    } catch (error) {
        console.error('❌ Error fetching projects:', error);
    }
}

verify();
