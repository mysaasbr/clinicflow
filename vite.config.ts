import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  process.env.DATABASE_URL = env.DATABASE_URL;

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {}, // Ensure no conflicting proxy
    },
    plugins: [
      react(),
      {
        name: 'api-server',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (!req.url || !req.url.startsWith('/api')) return next();

            console.log(`[Vite Server] API Request: ${req.method} ${req.url}`);

            try {
              const url = new URL(req.url, `http://${req.headers.host}`);
              const pathname = url.pathname;

              let entryPoint = '';
              // Route to the same consolidated entry points as Production (Vercel)
              if (pathname.startsWith('/api/admin/') || pathname.startsWith('/api/dashboard/')) {
                entryPoint = './api/admin.ts';
              } else if (pathname.startsWith('/api/projects/') || pathname.startsWith('/api/posts/') ||
                pathname.startsWith('/api/settings/') || pathname.startsWith('/api/onboarding/') ||
                pathname.startsWith('/api/changes/')) {
                entryPoint = './api/app.ts';
              } else {
                entryPoint = './api/public.ts';
              }

              const { default: handler } = await import(entryPoint);
              await handler(req, res);
            } catch (e: any) {
              console.error(`[Vite Server] Error routing to API:`, e.message);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Internal Server Error', details: e.message }));
            }
          });
        }
      }
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
