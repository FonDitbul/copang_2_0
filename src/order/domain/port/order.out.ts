import { OrderProduct } from '../orderProduct';
import { OrderPayment } from '../orderPayment';
import { Order } from '../order';

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
  buyerId: number;
  order: OrderCreateOut;
  payment: OrderPaymentCreateBuyOut;
  buyProduct: OrderProductCreateBuyOut[];
}

export interface OrderPaymentRequestOut {
  method: string;
  type: string;
  bankName: string;
  cardNumber: string;
  cardType: string;
  validityPeriod: string;
}
