import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentRepositoryPrisma } from './payment.repository.prisma';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepositoryPrisma],
})
export class PaymentModule {}
