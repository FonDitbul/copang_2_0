import { ICartAddIn, ICartChangeIn, ICartDeleteIn, ICartFindAllIn } from './port/cart.in';
import { Cart } from './cart';

export interface ICartService {
  findAll(findAllIn: ICartFindAllIn): Promise<{ carts: Cart[]; isEndPage: boolean }>;
  add(addIn: ICartAddIn): Promise<Cart>;
  change(changeIn: ICartChangeIn): Promise<Cart>;
  delete(deleteIn: ICartDeleteIn): Promise<Cart>;
}
