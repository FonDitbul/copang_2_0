import { OrderProduct } from '../orderProduct';

export interface OrderFindAllOrderProductIn {
  readonly buyerId: OrderProduct['buyerId'];
  readonly lastId: OrderProduct['id'];
  readonly limit: number;
}
