import { pgTable, uuid, text, timestamp, boolean, json, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const roleEnum = pgEnum('role', ['user', 'admin']);
export const projectStatusEnum = pgEnum('project_status', ['pending_payment', 'approved', 'in_progress', 'finished', 'published']);
export const postStatusEnum = pgEnum('post_status', ['draft', 'ready', 'downloaded']);
export const changeStatusEnum = pgEnum('change_status', ['pending', 'in_progress', 'done']);
export const leadStatusEnum = pgEnum('lead_status', ['new', 'contacted', 'scheduled', 'won', 'lost']);

// Users Table
export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    role: roleEnum('role').default('user'),
    onboarded: boolean('onboarded').default(false),
    createdAt: timestamp('created_at').defaultNow(),
});

// Clinics Table
export const clinics = pgTable('clinics', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    name: text('name').notNull(),
    phone: text('phone'),
    instagram: text('instagram'),
    colors: json('colors').$type<{ primary: string; secondary: string; palette?: string }>(),
    fonts: json('fonts').$type<{ primary: string; secondary: string }>(),
    toneTags: text('tone_tags').array(), // Autoridade, Conexão, etc
    differentials: text('differentials'),
    city: text('city'),
    address: text('address'),
    marketingGoals: text('marketing_goals').array(),
    slogan: text('slogan'),
    visualStyle: text('visual_style'), // 'luxury', 'modern', 'minimal', 'tech'
    createdAt: timestamp('created_at').defaultNow(),
});

// Projects Table (The Website)
export const projects = pgTable('projects', {
    id: uuid('id').defaultRandom().primaryKey(),
    clinicId: uuid('clinic_id').references(() => clinics.id).notNull(),
    status: projectStatusEnum('status').default('pending_payment'),
    paymentStatus: text('payment_status').default('pending'), // 'approved'
    domainUrl: text('domain_url'),
    videoPreviewUrl: text('video_preview_url'),
    monthlyFee: text('monthly_fee').default('R$ 59,00'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Payments Table (History)
export const payments = pgTable('payments', {
    id: uuid('id').defaultRandom().primaryKey(),
    projectId: uuid('project_id').references(() => projects.id).notNull(),
    amount: text('amount').notNull(), // Specific value the client pays, e.g. "R$ 97,00"
    monthYear: text('month_year'), // "02-2026"
    status: text('status').default('paid'), // 'paid', 'pending', 'refunded'
    createdAt: timestamp('created_at').defaultNow(),
});

// Usage Logs (Tracking activity)
export const usageLogs = pgTable('usage_logs', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    timestamp: timestamp('timestamp').defaultNow(),
});

// Posts Table (Social Media Content)
export const posts = pgTable('posts', {
    id: uuid('id').defaultRandom().primaryKey(),
    projectId: uuid('project_id').references(() => projects.id).notNull(),
    monthYear: text('month_year').notNull(), // "02-2026"
    status: postStatusEnum('status').default('draft'),
    imageUrl: text('image_url'),
    captionText: text('caption_text'),
    createdAt: timestamp('created_at').defaultNow(),
});

// Changes Table (Site modifications)
export const changes = pgTable('changes', {
    id: uuid('id').defaultRandom().primaryKey(),
    projectId: uuid('project_id').references(() => projects.id).notNull(),
    description: text('description').notNull(),
    status: changeStatusEnum('status').default('pending'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Leads Table (CRM)
export const leads = pgTable('leads', {
    id: uuid('id').defaultRandom().primaryKey(),
    projectId: uuid('project_id').references(() => projects.id).notNull(),
    name: text('name').notNull(),
    email: text('email'),
    phone: text('phone'),
    source: text('source'), // Hero, Funnel, etc
    status: leadStatusEnum('status').default('new'),
    value: text('value'), // Potencial ROI
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
    clinics: many(clinics),
}));

export const clinicsRelations = relations(clinics, ({ one, many }) => ({
    user: one(users, {
        fields: [clinics.userId],
        references: [users.id],
    }),
    projects: many(projects),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
    clinic: one(clinics, {
        fields: [projects.clinicId],
        references: [clinics.id],
    }),
    posts: many(posts),
    changes: many(changes),
    payments: many(payments),
    leads: many(leads),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
    project: one(projects, {
        fields: [payments.projectId],
        references: [projects.id],
    }),
}));

export const usageLogsRelations = relations(usageLogs, ({ one }) => ({
    user: one(users, {
        fields: [usageLogs.userId],
        references: [users.id],
    }),
}));

export const changesRelations = relations(changes, ({ one }) => ({
    project: one(projects, {
        fields: [changes.projectId],
        references: [projects.id],
    }),
}));

export const postsRelations = relations(posts, ({ one }) => ({
    project: one(projects, {
        fields: [posts.projectId],
        references: [projects.id],
    }),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
    project: one(projects, {
        fields: [leads.projectId],
        references: [projects.id],
    }),
}));
