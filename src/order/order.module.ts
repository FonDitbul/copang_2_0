import { Module } from '@nestjs/common';
import { RepositoryModule } from '../database/repository.module';
import { OrderController } from './api/order.controller';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';
import { OrderService } from './application/order.service';
import { OrderPrismaRepository } from './infrastructure/order.prisma.repository';
import { OrderPaymentHttpServer } from './infrastructure/order.payment.http.server';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [RepositoryModule, AuthModule, ProductModule, CartModule],
  controllers: [OrderController],
  providers: [
    {
      provide: 'IOrderService',
      useClass: OrderService,
    },
    {
      provide: 'IOrderRepository',
      useClass: OrderPrismaRepository,
    },
    {
      provide: 'IOrderPaymentServer',
      useClass: OrderPaymentHttpServer,
    },
  ],
  exports: [],
})
export class OrderModule {}
