import { ICartAddIn, ICartChangeIn, ICartDeleteIn, ICartFindAllIn } from './port/cart.in';
import { Cart } from './cart';

type CartFindAllOut = { carts: Cart[]; isEndPage: boolean };

export interface ICartService {
  findAll(findAllIn: ICartFindAllIn): Promise<CartFindAllOut>;
  add(addIn: ICartAddIn): Promise<Cart>;
  change(changeIn: ICartChangeIn): Promise<Cart>;
  delete(deleteIn: ICartDeleteIn): Promise<Cart>;
}
