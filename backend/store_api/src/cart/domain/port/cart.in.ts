import { Cart } from '../cart';

export interface ICartFindAllIn {
  readonly buyerId: Cart['buyerId'];
  readonly limit: number;
  readonly lastId: Cart['id'];
}

export interface ICartAddIn {
  readonly buyerId: Cart['buyerId'];
  readonly productId: Cart['productId'];
  readonly productQuantity: Cart['productQuantity'];
}

export interface ICartChangeIn {
  readonly id: Cart['id'];
  readonly buyerId: Cart['buyerId'];
  readonly productQuantity: Cart['productQuantity'];
  readonly status: Cart['status'];
}

export interface ICartDeleteIn {
  readonly id: Cart['id'];
  readonly buyerId: Cart['buyerId'];
}
