import { vi } from 'vitest';

export type DrizzleMock = {
	insert: ReturnType<typeof vi.fn>;
	values: ReturnType<typeof vi.fn>;
	returning: ReturnType<typeof vi.fn>;
};

export function createDbMock(): DrizzleMock {
	const mock: DrizzleMock = {
		insert: vi.fn().mockReturnThis(),
		values: vi.fn().mockReturnThis(),
		returning: vi.fn(),
	};
	return mock;
}
