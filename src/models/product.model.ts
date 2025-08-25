import type { DBClient } from '../database';
import {
	type ProductRecord,
	productSchema,
} from '../database/schemas/product.schema';

export type ProductData = {
	name: string;
	price: number;
};

export class ProductModel {
	constructor(private readonly db: DBClient) {}

	async save(productData: ProductData): Promise<ProductRecord> {
		const [data] = await this.db
			.insert(productSchema)
			.values(productData)
			.returning();

		return data;
	}
}
