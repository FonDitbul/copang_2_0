import { Injectable } from '@nestjs/common';
import { PaymentRepositoryPrisma } from './payment.repository.prisma';
import * as crypto from 'crypto';

export interface CreatePaymentIn {
  readonly method: string;
  readonly type: string;
  readonly bankName: string;
  readonly cardNumber: string;
  readonly cardType: string;
  readonly validityPeriod: string;
}

@Injectable()
export class PaymentService {
  constructor(private paymentRepository: PaymentRepositoryPrisma) {}
  async create(createPayment: CreatePaymentIn) {
    this.paymentRepository.create(createPayment);
    const paymentKeyMocking = crypto.randomUUID();
    return {
      paymentKey: paymentKeyMocking,
    };
  }
}
