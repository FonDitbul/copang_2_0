import { Cart } from '../cart';

export type ICartFindAllOut = Pick<Cart, 'buyerId'> & {
  readonly limit: number;
  readonly lastId: Cart['id'];
};

export type ICartCountOut = Pick<Cart, 'buyerId'> & { readonly lastId: Cart['id'] };

export type ICartAddOut = Pick<Cart, 'buyerId' | 'productId' | 'productQuantity'>;

export type ICartChangeOut = Pick<Cart, 'id' | 'productQuantity' | 'status'>;

export type ICartDeleteOut = Pick<Cart, 'id'>;

export type ICartDeleteByBuyOut = Pick<Cart, 'buyerId'> & { readonly productIdArray: Cart['productId'][] };
