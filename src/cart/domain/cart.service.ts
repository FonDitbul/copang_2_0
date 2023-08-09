import { ICartAddIn, ICartFindAllIn } from './port/cart.in';
import { Cart } from './cart';

export interface ICartService {
  findAll(findAllIn: ICartFindAllIn): Promise<{ carts: Cart[]; isEndPage: boolean }>;
  add(addIn: ICartAddIn): Promise<Cart>;
}
