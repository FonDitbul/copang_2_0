import { Review } from './review';
import { ReviewFindAllByProductIdOut } from './port/review.out';

export interface IReviewRepository {
  findAllByProductId: (findAllByProductIdOut: ReviewFindAllByProductIdOut) => Promise<Review[]>;
}
