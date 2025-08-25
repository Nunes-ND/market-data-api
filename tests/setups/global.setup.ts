import { setupTestDatabase } from '../helpers/database.helper';
import { checkEnv } from '../helpers/env.helper';

export default async function () {
	try {
		const env = checkEnv();
		await setupTestDatabase(env.databasePath);
	} catch (error) {
		console.error('Error:', error);
	}
}
