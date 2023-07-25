import { Product } from './product';

export type ProductWhere = Partial<Product>;

export interface IProductRepository {
  findOne: (ProductWhere) => Promise<Product | null>;
}
