import type { Product, ProductData } from '@/models/product.model';

export type ProductProps = {
	id: string;
	name: string;
	price: number;
};

export class ProductController {
	constructor(private readonly productModel: Product) {}

	async handleSave(
		productData: ProductData,
	): Promise<string | ProductProps | undefined> {
		try {
			if (!productData.name || !productData.price) {
				throw new Error('Invalid product data');
			}

			const productRecord = await this.productModel.save(productData);
			return {
				id: productRecord.id,
				name: productRecord.name,
				price: productRecord.price,
			};
		} catch (error) {
			if (error instanceof Error) {
				return error.message;
			}
		}
	}
}
