import { Cart } from '../domain/cart';

export interface CartFindAllRes {
  carts: Cart[];
  isEndPage: boolean;
}

export interface CartAddRes {
  cart: Cart;
}

export interface CartChangeRes {
  cart: Cart;
}

export interface CartDeleteRes {
  cart: Cart;
}