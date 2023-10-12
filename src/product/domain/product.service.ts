import { IProductFindAllIn } from './port/product.in';
import { Product } from './product';

export interface IProductService {
  findAllForSale(findAllIn: IProductFindAllIn): Promise<{ products: Product[]; isEndPage: boolean }>;
  findOne(id: number): Promise<Product>;
}
