import { Product } from '@prisma/client';
import { OrderProduct } from './orderProduct';

export interface OrderBuyProduct {
  readonly productId: OrderProduct['productId'];
  readonly buyQuantity: OrderProduct['buyQuantity'];
}
export type MergeOrderProduct = Product & {
  readonly buyQuantity: OrderProduct['buyQuantity'];
};
