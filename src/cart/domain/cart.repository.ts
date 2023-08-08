import { Cart } from './cart';
import { ICartCountOut, ICartFindAllOut } from './port/cart.out';

export interface ICartRepository {
  findAllByBuyerId(findAllOut: ICartFindAllOut): Promise<Cart[]>;
  countByBuyerId(countOut: ICartCountOut): Promise<number>;
}
