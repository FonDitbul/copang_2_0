import { Product } from '../../product/domain/product';
import { OrderProduct } from './orderProduct';

export interface OrderBuyProduct {
  readonly productId: OrderProduct['productId'];
  readonly buyQuantity: OrderProduct['buyQuantity'];
}
export type MergeOrderProduct = Product & {
  readonly buyQuantity: OrderProduct['buyQuantity'];
};
