import { SortType } from '../../../common/domain/sort-type';
import { Review } from '../review';

export type ReviewFindAllByProductIdOut = Pick<Review, 'productId'> & {
  readonly lastReviewId: Review['id'];
  readonly limit: number;
  readonly sort: SortType;
  readonly sortColumn: string;
};

export type CreateByBuyerOut = Pick<Review, 'buyerId' | 'star' | 'content' | 'productId' | 'orderProductId'>;
