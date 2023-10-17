import { Product } from '../product';

export interface IProductFindAllOut {
  readonly limit: number;
  readonly page: number;
  readonly searchName?: Product['name'];
  readonly lastProductId?: Product['id'];
}
