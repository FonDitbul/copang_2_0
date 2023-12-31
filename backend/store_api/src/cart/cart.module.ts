import { Module } from '@nestjs/common';
import { RepositoryModule } from '@libs/repository';
import { CartController } from './api/cart.controller';
import { CartService } from './application/cart.service';
import { CartPrismaRepository } from './infrastructure/cart.prisma.repository';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';
import { CartBuyEventHandler } from './application/cart.buy.event.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [AuthModule, ProductModule, RepositoryModule, CqrsModule],
  controllers: [CartController],
  providers: [
    {
      provide: 'ICartService',
      useClass: CartService,
    },
    {
      provide: 'ICartRepository',
      useClass: CartPrismaRepository,
    },
    CartBuyEventHandler,
  ],
  exports: ['ICartRepository'],
})
export class CartModule {}
