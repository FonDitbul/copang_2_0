import { OrderPaymentRequestOut } from './port/order.out';
import { OrderPaymentRequestIn } from './port/order.in';

export interface IOrderPaymentServer {
  request(requestOut: OrderPaymentRequestOut): Promise<OrderPaymentRequestIn>;
}
