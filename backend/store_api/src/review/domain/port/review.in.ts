import { SortType } from '../../../common/domain/sort-type';
import { Review } from '../review';

export type ReviewFindAllByProductIdIn = Pick<Review, 'productId'> & {
  readonly lastReviewId: Review['id'];
  readonly limit: number;
  readonly sort: SortType;
  readonly sortColumn: string;
};

export type ReviewCreateByBuyerIn = Pick<Review, 'buyerId' | 'star' | 'content' | 'orderProductId'>;
