import { Cart } from './cart';
import { ICartAddOut, ICartChangeOut, ICartCountOut, ICartDeleteByBuyOut, ICartDeleteOut, ICartFindAllOut } from './port/cart.out';

export type CartWhereCondition = Partial<Cart>;

export interface ICartRepository {
  findOne(where: CartWhereCondition): Promise<Cart | null>;
  findAllByBuyerId(findAllOut: ICartFindAllOut): Promise<Cart[]>;
  countByBuyerId(countOut: ICartCountOut): Promise<number>;
  add(addOut: ICartAddOut): Promise<Cart>;
  change(changeOut: ICartChangeOut): Promise<Cart>;
  delete(deleteOut: ICartDeleteOut): Promise<Cart>;
  deleteByBuy(deleteOut: ICartDeleteByBuyOut): Promise<number>;
}
