import type { Config } from 'drizzle-kit';

const dbEnvOptions = {
	PRODUCTION: {
		dbCredentials: {
			url: process.env.DATABASE_URL as string,
		},
	},
	DEVELOPMENT: {
		driver: 'pglite',
		dbCredentials: {
			url: process.env.DATABASE_PATH as string,
		},
	},
} as const;

const dbOptions = process.env.NODE_ENV
	? dbEnvOptions.DEVELOPMENT
	: dbEnvOptions.PRODUCTION;

export default {
	schema: './src/database/schemas',
	out: './drizzle',
	dialect: 'postgresql',
	...dbOptions,
} satisfies Config;
