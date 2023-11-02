import { Injectable } from '@nestjs/common';
import { CreatePaymentIn } from './payment.service';

@Injectable()
export class PaymentRepositoryPrisma {
  constructor() {}
  create(payment: CreatePaymentIn) {
    console.log('create Prisma');
    console.log(payment);
    return;
  }
}
