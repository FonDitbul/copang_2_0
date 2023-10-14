import { OrderCard } from '../orderCard';
import { OrderBuyProduct } from '../orderBuyProduct';
import { Order } from '../order';
import { OrderProduct } from '../orderProduct';
import { OrderPayment } from '../orderPayment';

export interface OrderBuyIn {
  readonly buyerId: Order['buyerId'];
  readonly card: OrderCard;
  readonly address: OrderProduct['address'];
  readonly buyProduct: OrderBuyProduct[];
}

export interface OrderPaymentRequestIn {
  readonly paymentKey: OrderPayment['paymentKey'];
}
