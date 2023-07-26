import { SortType } from '../../../common/domain/sort-type';

export interface ReviewFindAllByProductIdIn {
  productId: number;
  lastReviewId: number;
  limit: number;
  sort: SortType;
  sortColumn: string;
}
