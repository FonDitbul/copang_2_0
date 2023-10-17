import { Product } from './product';
import { IProductFindAllOut } from './port/product.out';

export type ProductWhere = Partial<Product>;

export interface IProductRepository {
  findOne: (where: ProductWhere) => Promise<Product | null>;
  countForSale: (findAllOut: IProductFindAllOut) => Promise<number>;
  findAllForSale: (findAllOut: IProductFindAllOut) => Promise<Product[]>;
  findAllById: (idArray: Product['id'][]) => Promise<Product[]>;
}