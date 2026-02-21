export default function handler(req: any, res: any) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        router: 'admin',
        status: 'online',
        time: new Date().toISOString(),
        url: req.url
    }));
}
