import { Product } from '../product';

export type IProductFindAllIn = {
  readonly limit: number;
  readonly page: number;
  readonly searchName?: Product['name'];
};

export type IProductIdIn = Product['id'];
