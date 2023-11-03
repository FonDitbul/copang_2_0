import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ShippingModule } from './shipping/shipping.module';

@Module({
  imports: [ScheduleModule.forRoot(), ShippingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
