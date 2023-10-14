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
  'code' | 'cost' | 'name' | 'description' | 'information' | 'buyQuantity' | 'sellerId' | 'productId' | 'address'
>;

export interface OrderBuyOut {
  readonly buyerId: Order['buyerId'];
  readonly order: OrderCreateOut;
  readonly payment: OrderPaymentCreateBuyOut;
  readonly buyProduct: OrderProductCreateBuyOut[];
}

export interface OrderPaymentRequestOut {
  readonly method: OrderCard['method'];
  readonly type: OrderCard['type'];
  readonly bankName: OrderCard['bankName'];
  readonly cardNumber: OrderCard['cardNumber'];
  readonly cardType: OrderCard['cardType'];
  readonly validityPeriod: OrderCard['validityPeriod'];
}
