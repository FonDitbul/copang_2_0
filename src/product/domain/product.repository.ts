import { Product } from './product';
import { IProductFindAllOut } from './port/product.out';

export type ProductWhere = Partial<Product>;

export interface IProductRepository {
  findOne: (ProductWhere) => Promise<Product | null>;
  countForSale: (findAllOut: IProductFindAllOut) => Promise<number>;
  findAllForSale: (findAllOut: IProductFindAllOut) => Promise<Product[]>;findOne: (where: ProductWhere) => Promise<Product | null>;
  findAllById: (idArray: number[]) => Promise<Product[]>;
}
