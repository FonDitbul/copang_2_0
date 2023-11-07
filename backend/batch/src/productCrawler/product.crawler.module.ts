import { Module } from '@nestjs/common';
import { ProductCrawlerService } from './product.crawler.service';
import { CategoryCrawlerService } from './category.crawler.service';
import { CategoryPrismaRepository } from './category.prisma.repository';
import { RepositoryModule } from '@libs/repository';
import { ProductPrismaRepository } from './product.prisma.repository';

@Module({
  imports: [RepositoryModule],
  controllers: [],
  providers: [
    ProductCrawlerService,
    CategoryCrawlerService,
    {
      provide: 'CategoryRepository',
      useClass: CategoryPrismaRepository,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductPrismaRepository,
    },
  ],
})
export class ProductCrawlerModule {}
