import { Order } from './order';
import { OrderBuyOut } from './port/order.out';

export interface IOrderRepository {
  buy(buyOut: OrderBuyOut): Promise<Order>;
}
