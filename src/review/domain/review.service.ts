import { ReviewCreateByBuyerIn, ReviewFindAllByProductIdIn } from './port/review.in';
import { Review } from './review';

export interface IReviewService {
  findAllByProductId: (findAllByProductIdIn: ReviewFindAllByProductIdIn) => Promise<Review[]>;
  createByBuyer: (createByBuyerIn: ReviewCreateByBuyerIn) => Promise<Review>;
}
