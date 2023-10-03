import { SortType } from '../../../common/domain/sort-type';

export interface ReviewFindAllByProductIdOut {
  productId: number;
  lastReviewId: number;
  limit: number;
  sort: SortType;
  sortColumn: string;
}

export interface CreateByBuyerOut {
  star: number;
  content: string;
  productId: number;
  buyerId: number;
  orderProductId: number;
}
