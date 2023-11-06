import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ShippingModule } from './shipping/shipping.module';
import { ProductCrawlerModule } from './productCrawler/product.crawler.module';

@Module({
  imports: [ScheduleModule.forRoot(), ShippingModule, ProductCrawlerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
