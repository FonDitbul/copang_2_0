import { Cart } from '../domain/cart';

export interface CartFindAllRes {
  carts: Cart[];
  isEndPage: boolean;
}
