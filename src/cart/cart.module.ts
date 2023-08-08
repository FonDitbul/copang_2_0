import { Module } from '@nestjs/common';
import { RepositoryModule } from '../database/repository.module';
import { CartController } from './api/cart.controller';
import { CartService } from './application/cart.service';
import { CartPrismaRepository } from './infrastructure/cart.prisma.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, RepositoryModule],
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
  ],
  exports: [],
})
export class CartModule {}
