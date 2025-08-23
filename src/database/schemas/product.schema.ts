import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const productSchema = pgTable('products', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: text('name').notNull(),
	price: integer('price').notNull(),
	created_at: timestamp('created_at').defaultNow().notNull(),
	updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export type ProductRecord = typeof productSchema.$inferSelect;
