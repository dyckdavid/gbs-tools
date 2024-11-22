import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const user = sqliteTable('user', {
    id: text('id').primaryKey(),
    age: integer('age'),
    username: text('username').notNull().unique(),
    passwordHash: text('password_hash').notNull()
});

export const session = sqliteTable("session", {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const forms = sqliteTable("forms", {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title'),
    googleFormEmbedLink: text('google_form_embed_link'),
    linkName: text('link_name'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    isPublic: integer('is_public').default(0),
});



export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
export type Form = typeof forms.$inferSelect;
