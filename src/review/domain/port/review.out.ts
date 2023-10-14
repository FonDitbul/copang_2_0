import { SortType } from '../../../common/domain/sort-type';
import { Review } from '../review';

export interface ReviewFindAllByProductIdOut {
  readonly productId: Review['productId'];
  readonly lastReviewId: Review['id'];
  readonly limit: number;
  readonly sort: SortType;
  readonly sortColumn: string;
}

export interface CreateByBuyerOut {
  star: Review['star'];
  content: Review['content'];
  productId: Review['productId'];
  buyerId: Review['buyerId'];
  orderProductId: Review['orderProductId'];
}
