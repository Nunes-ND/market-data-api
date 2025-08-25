import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ProductRecord } from '@/database/schemas/product.schema';
import {
	createProductData,
	createProductRecord,
} from '@/tests/factories/product.factory';
import type { DBClient } from '../database';
import { type ProductData, ProductModel } from '../models/product.model';
import { ProductController } from './product.controller';

vi.mock('../models/product.model');

describe('Product controller', () => {
	describe('handleSave', () => {
		let productData: ProductData;
		let productRecord: ProductRecord;
		let productModel: ProductModel;
		let productControllerSut: ProductController;

		beforeEach(() => {
			productData = createProductData();
			productRecord = createProductRecord();
			productModel = new ProductModel({} as DBClient);
			productModel.save = vi.fn().mockResolvedValue(productRecord);
			productControllerSut = new ProductController(productModel);
			vi.clearAllMocks();
		});

		it('should save a product', async () => {
			const result = await productControllerSut.handleSave(productData);

			expect(productModel.save).toHaveBeenCalledWith(productData);
			expect(result).toStrictEqual({
				id: productRecord.id,
				name: productRecord.name,
				price: productRecord.price,
			});
		});

		it('should propagate database errors when operation fails', async () => {
			const errorMessage = 'Database constraint violation';
			const dbError = new Error(errorMessage);
			productModel.save = vi.fn().mockRejectedValue(dbError);

			const productControllerSut = new ProductController(productModel);

			const result = await productControllerSut.handleSave(productData);
			expect(result).toEqual(errorMessage);
		});

		const invalidCases: { data: Partial<ProductData>; field: string }[] = [
			{ data: { name: '' }, field: 'name' },
			{ data: { price: 100 }, field: 'price' },
			{ data: {}, field: 'name and price' },
		];
		it.each(invalidCases)(
			'should throw erros when $field is invalid',
			async ({ data }) => {
				const result = await productControllerSut.handleSave(
					data as ProductData,
				);

				expect(result).toEqual('Invalid product data');
			},
		);
	});
});
