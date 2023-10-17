import { Module } from '@nestjs/common';
import { ProductPrismaRepository } from './infrastructure/product.prisma.repository';
import { RepositoryModule } from '../database/repository.module';
import { ProductController } from './api/product.controller';
import { ProductService } from './application/product.service';

@Module({
  imports: [RepositoryModule],
  controllers: [ProductController],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: ProductPrismaRepository,
    },
    {
      provide: 'IProductService',
      useClass: ProductService,
    },
  ],
  exports: ['IProductRepository'],
})
export class ProductModule {}
