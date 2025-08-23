import { loadEnv } from 'vite';

export function checkEnv() {
	const env = loadEnv('', process.cwd(), '');
	if (!env.DATABASE_PATH) {
		throw new Error('DATABASE_PATH is not defined');
	}
	return { databasePatch: env.DATABASE_PATH };
}
