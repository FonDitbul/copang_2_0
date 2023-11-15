import { Injectable } from '@nestjs/common';
import { IOrderPaymentServer } from '../domain/order.payment.server';
import { OrderPaymentRequestOut } from '../domain/port/order.out';
import { OrderPaymentRequestIn } from '../domain/port/order.in';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class OrderPaymentHttpServer implements IOrderPaymentServer {
  constructor(private readonly httpService: HttpService) {}
  async request(requestOut: OrderPaymentRequestOut): Promise<OrderPaymentRequestIn> {
    const { data } = await firstValueFrom(
      this.httpService.post<{ paymentKey: string }>('http://store:5002/payment', requestOut).pipe(
        catchError((error: AxiosError) => {
          throw `${error} An error happened!`;
        }),
      ),
    );
    return data;
  }
}
