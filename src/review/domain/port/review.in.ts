import { SortType } from '../../../common/domain/sort-type';

export interface ReviewFindAllByProductIdIn {
  productId: number;
  lastReviewId: number;
  limit: number;
  sort: SortType;
  sortColumn: string;
}

export interface ReviewCreateByBuyerIn {
  buyerId: number;
  star: number;
  content: string;
  orderProductId: number;
}
