import { PGlite } from '@electric-sql/pglite';
import {
	drizzle as drizzlePg,
	type NodePgDatabase,
} from 'drizzle-orm/node-postgres';
import {
	drizzle as drizzlePgLite,
	type PgliteDatabase,
} from 'drizzle-orm/pglite';
import { Pool } from 'pg';
import * as schema from './schemas';

export type DBClient =
	| NodePgDatabase<typeof schema>
	| PgliteDatabase<typeof schema>;

export type DBConnections = Pool | PGlite;

export type Connections = {
	dbClient: DBClient;
	dbConnection: DBConnections;
};

function getDevelopmentDBClient() {
	const dbConnection = new PGlite(process.env.DATABASE_PATH);
	const dbClient = drizzlePgLite(dbConnection, { schema });
	return dbClient;
}

function getProductionDBClient() {
	const dbConnection = new Pool({ connectionString: process.env.DATABASE_URL });
	const dbClient = drizzlePg(dbConnection, { schema });
	return dbClient;
}

export async function getDBClient(): Promise<DBClient> {
	const dbClient =
		process.env.NODE_ENV === 'development'
			? getDevelopmentDBClient()
			: getProductionDBClient();
	return dbClient;
}
