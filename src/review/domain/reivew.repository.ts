import { Review } from './review';
import { CreateByBuyerOut, ReviewFindAllByProductIdOut } from './port/review.out';

export interface IReviewRepository {
  findAllByProductId: (findAllByProductIdOut: ReviewFindAllByProductIdOut) => Promise<Review[]>;
  createByBuyer: (createByBuyerOut: CreateByBuyerOut) => Promise<Review>;
}
