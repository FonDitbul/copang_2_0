import { OrderProduct } from '../orderProduct';
import { OrderPayment } from '../orderPayment';
import { Order } from '../order';
import { OrderCard } from '../orderCard';

export type OrderCreateOut = Pick<Order, 'code' | 'name' | 'totalCost'>;

export type OrderPaymentCreateBuyOut = Pick<
  OrderPayment,
  | 'bankName'
  | 'cardNumber'
  | 'cardType'
  | 'paymentKey'
  | 'type'
  | 'orderCode'
  | 'orderName'
  | 'method'
  | 'totalAmount'
  | 'validityPeriod'
  | 'requestAt'
>;

export type OrderProductCreateBuyOut = Pick<
  OrderProduct,
  'code' | 'cost' | 'name' | 'description' | 'information' | 'buyQuantity' | 'sellerId' | 'productId' | 'address' | 'mainImage'
>;

export type OrderBuyOut = Pick<Order, 'buyerId'> & {
  readonly order: OrderCreateOut;
  readonly payment: OrderPaymentCreateBuyOut;
  readonly buyProduct: OrderProductCreateBuyOut[];
};

export type OrderPaymentRequestOut = Pick<OrderCard, 'method' | 'type' | 'bankName' | 'cardNumber' | 'validityPeriod'>;
