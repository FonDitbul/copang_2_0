import { Inject, Injectable } from '@nestjs/common';
import { IReviewService } from '../domain/review.service';
import { IReviewRepository } from '../domain/reivew.repository';
import { ReviewFindAllByProductIdIn } from '../domain/port/review.in';

@Injectable()
export class ReviewService implements IReviewService {
  constructor(@Inject('IReviewRepository') private reviewRepository: IReviewRepository) {}

  async findAllByProductId(findAllByProductIdIn: ReviewFindAllByProductIdIn) {
    const result = await this.reviewRepository.findAllByProductId({ ...findAllByProductIdIn });
    return result;
  }
}
