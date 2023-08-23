import { OrderProduct } from './orderProduct';

export interface IOrderProductRepository {
  findOneById(id: number): Promise<OrderProduct>;
  updateByReview(id: number, reviewId: number): Promise<OrderProduct>;
}
