import { beforeEach, describe, expect, it } from 'vitest';
import { createProductData } from '@/tests/factories/product.factory';
import { db } from '@/tests/setups/integration.setup';
import { Product, type ProductData } from '../models/product.model';
import { ProductController, type ProductProps } from './product.controller';

describe('Product controller', () => {
	describe('handleSave', () => {
		let productData: ProductData;
		let productModel: Product;
		let productControllerSut: ProductController;

		beforeEach(() => {
			productData = createProductData();
			productModel = new Product(db);
			productControllerSut = new ProductController(productModel);
		});

		it('should save a product and return the created record', async () => {
			const result = (await productControllerSut.handleSave(
				productData,
			)) as ProductProps;

			const uuidRegex =
				/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
			expect(result.id).toMatch(uuidRegex);
			expect(result.name).toBe(productData.name);
			expect(result.price).toBe(productData.price);
		});
	});
});
