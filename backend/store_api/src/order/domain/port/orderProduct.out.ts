import { OrderProduct } from '../orderProduct';

export interface OrderProductFindAllOut {
  readonly buyerId: OrderProduct['buyerId'];
  readonly lastId: OrderProduct['id'];
  readonly limit: number;
}
