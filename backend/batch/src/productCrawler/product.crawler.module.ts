import { Module } from '@nestjs/common';
import { ProductCrawlerService } from './product.crawler.service';
import { CategoryCrawlerService } from './category.crawler.service';
import { CategoryPrismaRepository } from './category.prisma.repository';
import { RepositoryModule } from '@libs/repository';

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
  ],
})
export class ProductCrawlerModule {}
