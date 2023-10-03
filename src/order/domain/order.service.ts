import { OrderBuyIn } from './port/order.in';

export interface IOrderService {
  buy(buyProductIn: OrderBuyIn): Promise<boolean>;
}
