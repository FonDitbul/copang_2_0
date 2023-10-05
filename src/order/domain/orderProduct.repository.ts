import { OrderProduct } from './orderProduct';
import { OrderProductFindAllOut } from './port/orderProduct.out';

export interface IOrderProductRepository {
  findOneById(id: number): Promise<OrderProduct>;
  updateByReview(id: number, reviewId: number): Promise<OrderProduct>;
  findAllByBuyerIdNoOffset(findAllOut: OrderProductFindAllOut): Promise<OrderProduct[]>;
}
