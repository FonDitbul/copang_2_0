import { SortType } from '../../../common/domain/sort-type';
import { Review } from '../review';

export interface ReviewFindAllByProductIdIn {
  readonly productId: Review['productId'];
  readonly lastReviewId: Review['id'];
  readonly limit: number;
  readonly sort: SortType;
  readonly sortColumn: string;
}

export interface ReviewCreateByBuyerIn {
  readonly buyerId: Review['buyerId'];
  readonly star: Review['star'];
  readonly content: Review['content'];
  readonly orderProductId: Review['orderProductId'];
}
