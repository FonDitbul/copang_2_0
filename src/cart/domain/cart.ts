import { Product } from '../../product/domain/product';

export const CART_MAX_COUNT = 50;

export interface Cart {
  id: number;
  productQuantity: number;
  status: string;
  buyerId: number;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  Product: Partial<Product>;
}
