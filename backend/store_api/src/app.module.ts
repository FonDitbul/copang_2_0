import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BuyerModule } from './buyer/buyer.module';
import { HealthController } from './common/api/health.controller';
import { PrismaService } from '@libs/repository';
import { LoggerMiddleware } from './common/api/logger.middleware';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [BuyerModule, ProductModule, ReviewModule, OrderModule, CartModule],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
