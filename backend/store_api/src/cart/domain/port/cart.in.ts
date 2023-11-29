import { Cart } from '../cart';

export type ICartFindAllIn = Pick<Cart, 'buyerId'> & { readonly limit: number; readonly lastId: Cart['id'] };

export type ICartAddIn = Pick<Cart, 'buyerId' | 'productId' | 'productQuantity'>;

export type ICartChangeIn = Pick<Cart, 'id' | 'buyerId' | 'productQuantity' | 'status'>;

export type ICartDeleteIn = Pick<Cart, 'id' | 'buyerId'>;
