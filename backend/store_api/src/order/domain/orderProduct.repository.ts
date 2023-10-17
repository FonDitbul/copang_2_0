import { OrderProduct } from './orderProduct';
import { OrderProductFindAllOut } from './port/orderProduct.out';

export interface IOrderProductRepository {
  findOneById(id: OrderProduct['id']): Promise<OrderProduct>;
  updateByReview(id: OrderProduct['id'], reviewId: OrderProduct['reviewId']): Promise<OrderProduct>;
  findAllByBuyerIdNoOffset(findAllOut: OrderProductFindAllOut): Promise<OrderProduct[]>;
}
