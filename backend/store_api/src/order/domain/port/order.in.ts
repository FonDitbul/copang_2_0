import { OrderCard } from '../orderCard';
import { OrderBuyProduct } from '../orderBuyProduct';
import { Order } from '../order';
import { OrderProduct } from '../orderProduct';
import { OrderPayment } from '../orderPayment';

export type OrderBuyIn = Pick<Order, 'buyerId'> &
  Pick<OrderProduct, 'address'> & {
    readonly card: OrderCard;
    readonly buyProduct: OrderBuyProduct[];
  };

export type OrderPaymentRequestIn = Pick<OrderPayment, 'paymentKey'>;
