import { Module } from '@nestjs/common';
import { ProductCrawlerService } from './product.crawler.service';
import { CategoryCrawlerService } from './category.crawler.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ProductCrawlerService, CategoryCrawlerService],
})
export class ProductCrawlerModule {}
