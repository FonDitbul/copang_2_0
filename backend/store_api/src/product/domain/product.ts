import { Seller } from '../../seller/domain/seller';
import { Category } from '../../category/domain/category';

export class Product {
  id: number;
  name: string;
  code: string;
  description: string;
  information: string;
  quantity: number;
  cost: number;
  isSale: boolean;
  sellerId: number;
  categoryId: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  Seller?: Partial<Seller>;
  Category?: Partial<Category>;

  static isDeleted(product: Product) {
    return !!product.deletedAt;
  }

  static isOverQuantity(product: Product, quantity: Product['quantity']) {
    return product.quantity < quantity;
  }
}
