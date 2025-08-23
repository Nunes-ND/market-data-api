import type { ProductRecord } from '@/database/schemas/product.schema';
import type { ProductData } from '@/models/product.model.ts';

export const createProductData = (
	overrides: Partial<ProductData> = {},
): ProductData => ({
	name: 'Default Product',
	price: 100,
	...overrides,
});

export const createProductRecord = (
	overrides: Partial<ProductRecord> = {},
): ProductRecord => ({
	id: 'default-id',
	name: 'Default Product',
	price: 100,
	created_at: new Date('2025-01-01'),
	updated_at: new Date('2025-01-01'),
	...overrides,
});
