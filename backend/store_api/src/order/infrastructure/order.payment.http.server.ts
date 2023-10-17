import { Injectable } from '@nestjs/common';
import { IOrderPaymentServer } from '../domain/order.payment.server';
import * as crypto from 'crypto';
import { OrderPaymentRequestOut } from '../domain/port/order.out';
import { OrderPaymentRequestIn } from '../domain/port/order.in';

@Injectable()
export class OrderPaymentHttpServer implements IOrderPaymentServer {
  async request(requestOut: OrderPaymentRequestOut): Promise<OrderPaymentRequestIn> {
    const paymentKeyMocking = crypto.randomUUID();
    return {
      paymentKey: paymentKeyMocking,
    };
  }
}
