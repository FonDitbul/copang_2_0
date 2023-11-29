import { Product } from '../product';

export type IProductFindAllOut = {
  readonly limit: number;
  readonly page: number;
  readonly searchName?: Product['name'];
  readonly lastProductId?: Product['id'];
};

export type IProductIdArrayOut = Product['id'][];
