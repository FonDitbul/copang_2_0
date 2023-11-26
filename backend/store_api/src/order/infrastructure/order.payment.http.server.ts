import { Injectable } from '@nestjs/common';
import { IOrderPaymentServer } from '../domain/order.payment.server';
import { OrderPaymentRequestOut } from '../domain/port/order.out';
import { OrderPaymentRequestIn } from '../domain/port/order.in';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderPaymentHttpServer implements IOrderPaymentServer {
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}
  async request(requestOut: OrderPaymentRequestOut): Promise<OrderPaymentRequestIn> {
    const paymentAPIUrl = this.configService.getOrThrow('PAYMENT_API_URL');

    const { data } = await firstValueFrom(
      this.httpService.post<{ paymentKey: string }>(`${paymentAPIUrl}/payment`, requestOut).pipe(
        catchError((error: AxiosError) => {
          throw `${error} An error happened!`;
        }),
      ),
    );
    return data;
  }
}
