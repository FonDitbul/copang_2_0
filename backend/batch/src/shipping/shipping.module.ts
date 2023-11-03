import { Module } from '@nestjs/common';
import { RepositoryModule } from '@libs/repository';
import { ShippingBatchService } from './shipping.batch.service';
import { OrderProductPrismaRepository } from './orderProduct.prisma.repository';

@Module({
  imports: [RepositoryModule],
  controllers: [],
  providers: [
    ShippingBatchService,
    {
      provide: 'OrderProductRepository',
      useClass: OrderProductPrismaRepository,
    },
  ],
})
export class ShippingModule {}
