import { Module } from '@nestjs/common';
import { ProductPrismaRepository } from './infrastructure/product.prisma.repository';
import { RepositoryModule } from '../database/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: ProductPrismaRepository,
    },
  ],
  exports: ['IProductRepository'],
})
export class ProductModule {}
