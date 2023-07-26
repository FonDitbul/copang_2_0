import { Module } from '@nestjs/common';
import { RepositoryModule } from '../database/repository.module';
import { ReviewController } from './api/review.controller';
import { ProductModule } from '../product/product.module';
import { ReviewService } from './application/review.service';
import { ReviewPrismaRepository } from './infrastructure/review.prisma.repository';

@Module({
  imports: [RepositoryModule, ProductModule],
  controllers: [ReviewController],
  providers: [
    {
      provide: 'IReviewService',
      useClass: ReviewService,
    },
    {
      provide: 'IReviewRepository',
      useClass: ReviewPrismaRepository,
    },
  ],
})
export class ReviewModule {}
