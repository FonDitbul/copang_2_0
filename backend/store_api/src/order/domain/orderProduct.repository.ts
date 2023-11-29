import { OrderProduct } from './orderProduct';
import { OrderProductFindAllOut, OrderProductIdOut, OrderProductUpdateByReviewOut } from './port/orderProduct.out';

export interface IOrderProductRepository {
  findOneById(id: OrderProductIdOut): Promise<OrderProduct>;
  updateByReview(updateOut: OrderProductUpdateByReviewOut): Promise<OrderProduct>;
  findAllByBuyerIdNoOffset(findAllOut: OrderProductFindAllOut): Promise<OrderProduct[]>;
}
