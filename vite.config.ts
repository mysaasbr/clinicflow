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
          // Global logging middleware to debug why routes are 404
          server.middlewares.use((req, res, next) => {
            if (req.url && req.url.startsWith('/api')) {
              console.log(`[Vite Server] API Request: ${req.method} ${req.url}`);
            }
            next();
          });

          server.middlewares.use('/api/webhooks/abacatepay', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/webhooks/abacatepay.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/auth/login', async (req, res, next) => {
            if (req.method !== 'POST') return next();

            const buffers = [];
            for await (const chunk of req) buffers.push(chunk);
            const data = JSON.parse(Buffer.concat(buffers).toString());

            // dynamic import to avoid build issues
            const { db } = await import('./src/db/index.ts');
            const { users } = await import('./src/db/schema.ts');
            const { eq } = await import('drizzle-orm');

            try {
              const [user] = await db.select().from(users).where(eq(users.email, data.email));

              if (!user || user.passwordHash !== data.password) {
                res.statusCode = 401;
                res.end(JSON.stringify({ error: 'Credenciais ou senha inválidas (Local Dev)' }));
                return;
              }

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                user: { id: user.id, email: user.email, role: user.role },
                token: 'local-dev-token-' + user.id
              }));
            } catch (e) {
              console.error(e);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
          });

          server.middlewares.use('/api/auth/register', async (req, res, next) => {
            if (req.method !== 'POST') return next();

            const buffers = [];
            for await (const chunk of req) buffers.push(chunk);
            const data = JSON.parse(Buffer.concat(buffers).toString());

            const { db } = await import('./src/db/index.ts');
            const { users, clinics } = await import('./src/db/schema.ts');
            const { eq } = await import('drizzle-orm');

            try {
              const existing = await db.select().from(users).where(eq(users.email, data.email));
              if (existing.length > 0) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Email já cadastrado' }));
                return;
              }

              const [newUser] = await db.insert(users).values({
                email: data.email,
                passwordHash: data.password,
                role: 'user'
              }).returning();

              await db.insert(clinics).values({
                userId: newUser.id,
                name: data.name,
              });

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                user: { id: newUser.id, email: newUser.email, name: data.name, role: newUser.role },
                token: 'local-dev-token-' + newUser.id
              }));
            } catch (e) {
              console.error(e);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
          });

          // --- ADMIN ROUTES ---

          // GET /api/admin/clients
          server.middlewares.use('/api/admin/clients', async (req, res, next) => {
            if (req.method !== 'GET') return next();

            const { db } = await import('./src/db/index.ts');
            const { users, clinics, projects } = await import('./src/db/schema.ts');
            const { eq } = await import('drizzle-orm');

            try {
              const result = await db.select({
                id: clinics.id, // Return Clinic ID as primary ID for management
                userId: users.id,
                name: clinics.name,
                email: users.email,
                role: users.role,
                clinicName: clinics.name,
                createdAt: users.createdAt,
                projectId: projects.id,
                projectStatus: projects.status
              })
                .from(users)
                .leftJoin(clinics, eq(users.id, clinics.userId))
                .leftJoin(projects, eq(clinics.id, projects.clinicId))
                .where(eq(users.role, 'user'));

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
            } catch (e) {
              console.error(e);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Error fetching clients' }));
            }
          });


          // GET /api/admin/stats
          server.middlewares.use('/api/admin/stats', async (req, res, next) => {
            if (req.method !== 'GET') return next();

            const { db } = await import('./src/db/index.ts');
            const { users, projects } = await import('./src/db/schema.ts');
            const { eq, count } = await import('drizzle-orm');

            try {
              const [userCount] = await db.select({ count: count() }).from(users).where(eq(users.role, 'user'));
              const [projectCount] = await db.select({ count: count() }).from(projects);

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                clients: userCount.count,
                revenue: userCount.count * 97, // Revenue: Clients * R$97
                projects: projectCount.count
              }));
            } catch (e) {
              console.error(e);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Error fetching stats' }));
            }
          });

          // --- NEW ROUTES ---

          server.middlewares.use('/api/projects/list', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/projects/list.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/posts/list', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/posts/list.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/posts/create', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/posts/create.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/posts/delete', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/posts/delete.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/posts/update', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/posts/update.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/quiz/submit', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/quiz/submit.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/dashboard/overview', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/dashboard/overview.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/projects/update-status', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/projects/update-status.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/projects/create', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/projects/create.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/projects/update', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/projects/update.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/projects/delete', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/projects/delete.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          // --- ADMIN ROUTES (MODERN) ---

          server.middlewares.use('/api/admin/get-settings', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/admin/get-settings.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/admin/subscriptions', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/admin/subscriptions.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/admin/client-details', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/admin/client-details.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/admin/add-payment', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/admin/add-payment.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/admin/liberate-access', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/admin/liberate-access.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/admin/create-manual-client', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/admin/create-manual-client.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/admin/update-client-fee', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/admin/update-client-fee.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/posts/months', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/posts/months.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          // AI Improvement Route
          server.middlewares.use('/api/ai/improve-text', async (req, res, next) => {
            console.log('[Vite Admin] Hit /api/ai/improve-text middleware');
            try {
              console.log('[Vite Admin] Attempting to import improve-text.ts');
              const { default: handler } = await import('./api/ai/improve-text.ts');
              console.log('[Vite Admin] Import successful, calling handler');
              await handler(req, res);
              console.log('[Vite Admin] Handler completed');
            } catch (e: any) {
              console.error('[Vite Admin] ERROR in AI middleware:', e.message);
              console.error(e.stack);
              next(e);
            }
          });

          // Change Request Routes
          server.middlewares.use('/api/changes/create', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/changes/create.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/changes/check-status', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/changes/check-status.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/admin/changes/list', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/admin/changes/list.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/admin/changes/update-status', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/admin/changes/update-status.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });


          server.middlewares.use('/api/payments/create-session', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/payments/create-session.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
            }
          });

          server.middlewares.use('/api/settings/update-clinic', async (req, res, next) => {
            try {
              const { default: handler } = await import('./api/settings/update-clinic.ts');
              await handler(req, res);
            } catch (e) {
              console.error(e);
              next(e);
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
