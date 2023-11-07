export interface CreateProduct {
  name: string;
  code: string;
  description: string;
  information: string;
  quantity: number;
  cost: number;
  isSale: boolean;
  mainImage: string;
  sellerId: number;
  categoryId: number;
}

export interface ProductRepository {
  createMany(productArray: CreateProduct[]): Promise<void>;
}
