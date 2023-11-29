import { IProductFindAllIn, IProductIdIn } from './port/product.in';
import { Product } from './product';

type ProductFindAllOut = {
  products: Product[];
  isEndPage: boolean;
};

export interface IProductService {
  findAllForSale(findAllIn: IProductFindAllIn): Promise<ProductFindAllOut>;
  findOne(id: IProductIdIn): Promise<Product>;
}
