import { ReviewFindAllByProductIdIn } from './port/review.in';
import { Review } from './review';

export interface IReviewService {
  findAllByProductId: (findAllByProductIdIn: ReviewFindAllByProductIdIn) => Promise<Review[]>;
}
