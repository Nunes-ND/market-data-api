import { existsSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/pglite';
import { migrate } from 'drizzle-orm/pglite/migrator';
import type { DBClient } from '../../src/database';
import * as schema from '../../src/database/schemas';

export async function setupTestDatabase(databasePath: string) {
	console.info('Checking if local database exists...');
	if (!existsSync(databasePath)) {
		console.info('Local database not found, creating and migrating...');
		const client = new PGlite(databasePath);
		await migrate(drizzle(client, { schema }), {
			migrationsFolder: './drizzle',
		});
		await client.close();
		console.info('Database migrated successfully.');
	}
}

export async function truncateAllTables(db: DBClient) {
	try {
		const result = await db.execute(
			sql`SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename != '__drizzle_migrations';`,
		);

		const tableNames = result.rows
			.map(({ tablename }) => `"${tablename}"`)
			.join(', ');

		if (tableNames) {
			await db.execute(
				sql.raw(`TRUNCATE TABLE ${tableNames} RESTART IDENTITY CASCADE;`),
			);
		}
	} catch (error) {
		console.error('Error truncating tables:', error);
	}
}
