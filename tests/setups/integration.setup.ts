import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { afterAll, afterEach, beforeAll } from 'vitest';
import type { DBClient } from '@/database';
import { truncateAllTables } from '../helpers/database.helper';

export let db: DBClient;
let client: PGlite;

beforeAll(async () => {
	client = new PGlite(process.env.DATABASE_PATH);
	db = drizzle(client);
});

afterEach(async () => {
	await truncateAllTables(db);
});

afterAll(async () => {
	await client.close();
});
