import { Order } from './order';
import { OrderBuyOut } from './port/order.out';

export interface IOrderRepository {
  findOne(): Promise<Order>;
  buy(buyOut: OrderBuyOut): Promise<Order>;
}
