import { Module } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { HealthController } from './common/health.controller';

@Module({
  imports: [PaymentModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
