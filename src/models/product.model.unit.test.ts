import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
	createProductData,
	createProductRecord,
} from '@/tests/factories/product.factory';
import { createDbMock } from '@/tests/mocks/db.mock';
import type { DBClient } from '../database';
import {
	type ProductRecord,
	productSchema,
} from '../database/schemas/product.schema';
import { type ProductData, ProductModel } from './product.model';

describe('Product model', () => {
	describe('save', () => {
		const productData: ProductData = createProductData();
		const productDataStub: ProductRecord = createProductRecord();

		beforeEach(() => {
			vi.resetAllMocks();
		});

		it('should save a product and call the database methods correctly', async () => {
			const mockDb = createDbMock();
			mockDb.returning.mockResolvedValue([productDataStub]);
			const productSut = new ProductModel(mockDb as unknown as DBClient);

			const result = await productSut.save(productData);

			expect(result).toStrictEqual(productDataStub);
			expect(mockDb.insert).toHaveBeenCalledWith(productSchema);
			expect(mockDb.values).toHaveBeenCalledWith(productData);
			expect(mockDb.returning).toHaveBeenCalledTimes(1);
		});

		it('should propagate database errors when operation fails', async () => {
			const mockDb = createDbMock();
			const dbError = new Error('Database constraint violation');
			mockDb.returning.mockRejectedValue(dbError);
			const productSut = new ProductModel(mockDb as unknown as DBClient);

			await expect(productSut.save(productData)).rejects.toThrow(dbError);

			expect(mockDb.insert).toHaveBeenCalledWith(productSchema);
			expect(mockDb.values).toHaveBeenCalledWith(productData);
		});
	});
});
