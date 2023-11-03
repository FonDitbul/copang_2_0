import { Module } from '@nestjs/common';
import { RepositoryModule } from '@libs/repository';
import { ReviewController } from './api/review.controller';
import { ProductModule } from '../product/product.module';
import { ReviewService } from './application/review.service';
import { ReviewPrismaRepository } from './infrastructure/review.prisma.repository';
import { AuthModule } from '../auth/auth.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [RepositoryModule, ProductModule, AuthModule, OrderModule],
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
