import { Cart } from '../cart';

export interface ICartFindAllOut {
  readonly buyerId: Cart['buyerId'];
  readonly limit: number;
  readonly lastId: Cart['id'];
}

export interface ICartCountOut {
  readonly buyerId: Cart['buyerId'];
  readonly lastId: Cart['id'];
}

export interface ICartAddOut {
  readonly buyerId: Cart['buyerId'];
  readonly productId: Cart['productId'];
  readonly productQuantity: Cart['productQuantity'];
}

export interface ICartChangeOut {
  readonly id: Cart['id'];
  readonly productQuantity: Cart['productQuantity'];
  readonly status: Cart['status'];
}

export interface ICartDeleteOut {
  readonly id: Cart['id'];
}

export interface ICartDeleteByBuyOut {
  readonly buyerId: Cart['buyerId'];
  readonly productIdArray: Cart['productId'][];
}
