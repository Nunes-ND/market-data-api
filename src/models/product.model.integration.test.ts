import { describe, expect, it } from 'vitest';
import type { DBClient } from '@/database';
import { createProductData } from '@/tests/factories/product.factory';
import { db } from '@/tests/setups/integration.setup';
import { type ProductData, ProductModel } from './product.model';

describe('Product model', () => {
	describe('save', () => {
		it('should save a product', async () => {
			const productData = createProductData();
			const productSut = new ProductModel(db as unknown as DBClient);

			const result = await productSut.save(productData);

			const uuidRegex =
				/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
			expect(result.id).toMatch(uuidRegex);
			expect(result.name).toEqual(productData.name);
			expect(result.price).toEqual(productData.price);
			expect(result.created_at).toEqual(result.updated_at);
		});

		const invalidCases: { data: Partial<ProductData>; field: string }[] = [
			{ data: { price: 100 }, field: 'name' },
			{ data: { name: 'valid' }, field: 'price' },
		];
		it.each(invalidCases)(
			'should not save a product with no $field',
			async ({ data }) => {
				const productSut = new ProductModel(db as unknown as DBClient);

				await expect(productSut.save(data as ProductData)).rejects.toThrow();
			},
		);
	});
});
