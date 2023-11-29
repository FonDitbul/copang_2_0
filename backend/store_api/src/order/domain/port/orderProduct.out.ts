import { OrderProduct } from '../orderProduct';

export type OrderProductFindAllOut = Pick<OrderProduct, 'buyerId'> & {
  readonly limit: number;
  readonly lastId: OrderProduct['id'];
};

export type OrderProductIdOut = OrderProduct['id'];

export type OrderProductUpdateByReviewOut = Pick<OrderProduct, 'id' | 'reviewId'> & {
  readonly reviewId: number;
};
