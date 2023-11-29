import { OrderProduct } from '../orderProduct';

export type OrderFindAllOrderProductIn = Pick<OrderProduct, 'buyerId'> & {
  readonly limit: number;
  readonly lastId: OrderProduct['id'];
};
