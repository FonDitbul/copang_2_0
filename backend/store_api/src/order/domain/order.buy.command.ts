import { OrderBuyIn } from './port/order.in';
import { OrderBuyProduct } from './orderBuyProduct';
import { OrderCard } from './orderCard';
import { Order } from './order';
import { OrderProduct } from './orderProduct';

export class OrderBuyCommand implements OrderBuyIn {
  constructor(
    public readonly buyerId: Order['buyerId'],
    public readonly address: OrderProduct['address'],
    public readonly card: OrderCard,
    public readonly buyProduct: OrderBuyProduct[],
  ) {}
}
