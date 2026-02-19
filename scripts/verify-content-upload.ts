
// Assuming Node 18+ or a polyfill is present

const ports = [3000, 3001, 3002, 3003, 3004, 3005];

async function verify() {
    let baseUrl = '';

    console.log('Scanning ports for API...');
    for (const port of ports) {
        const url = `http://localhost:${port}/api/projects/list`;
        try {
            const res = await fetch(url);
            const contentType = res.headers.get('content-type');
            if (res.ok && contentType && contentType.includes('application/json')) {
                console.log(`FOUND API at port ${port}`);
                baseUrl = `http://localhost:${port}`;
                break;
            }
        } catch (e) {
            // ignore connection refused
        }
    }

    if (!baseUrl) {
        console.error('Could not find running API on ports 3000-3005');
        return;
    }

    console.log('1. Fetching projects...');
    try {
        const resProjects = await fetch(`${baseUrl}/api/projects/list`);
        if (!resProjects.ok) {
            console.error('Failed to fetch projects:', resProjects.status, resProjects.statusText);
            const text = await resProjects.text();
            console.error('Body:', text);
            return;
        }
        const projects = await resProjects.json();
        console.log('Projects found:', projects.length);
        console.log(projects);

        if (projects.length === 0) {
            console.warn('No projects found. Cannot test post creation.');
            return;
        }

        const projectId = projects[0].id;
        console.log(`2. Creating post for project ${projectId}...`);

        const postData = {
            projectId,
            month: '02-2026',
            imageUrl: 'https://files.catbox.moe/test-image.jpg',
            caption: 'Teste de post via API'
        };

        const resPost = await fetch(`${baseUrl}/api/posts/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });

        if (!resPost.ok) {
            console.error('Failed to create post:', resPost.status, resPost.statusText);
            const text = await resPost.text();
            console.error('Body:', text);
            return;
        }

        const newPost = await resPost.json();
        console.log('Post created successfully:', newPost);

    } catch (error) {
        console.error('Verification failed:', error);
    }
}

verify();
