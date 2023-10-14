import { Product } from '../product';

export interface IProductFindAllIn {
  readonly limit: number;
  readonly page: number;
  readonly searchName?: Product['name'];
}
