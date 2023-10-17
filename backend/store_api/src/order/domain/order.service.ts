import { OrderBuyIn } from './port/order.in';
import { OrderProduct } from './orderProduct';
import { OrderFindAllOrderProductIn } from './port/orderProduct.in';

export interface IOrderService {
  buy(buyProductIn: OrderBuyIn): Promise<boolean>;
  findAllOrderProduct(findAllOrderProductIn: OrderFindAllOrderProductIn): Promise<OrderProduct[]>;
}
