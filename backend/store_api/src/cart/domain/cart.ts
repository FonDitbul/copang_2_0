import { Product } from '../../product/domain/product';

export const CART_MAX_COUNT = 20;

export class Cart {
  id: number;
  productQuantity: number;
  status: string;
  buyerId: number;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  Product?: Partial<Product>;

  static isExist(cart: Cart) {
    return !!cart;
  }

  static isDeleted(cart: Cart) {
    return !!cart.deletedAt;
  }

  static isSameBuyerId(cart: Cart, buyerId: Cart['buyerId']) {
    return cart.buyerId === buyerId;
  }
}
