import { Seller } from './Seller';
import { Category } from './Category';
export interface Product {
  id: number;
  name: string;
  code: string;
  description: string;
  information: string;
  quantity: number;
  cost: number;
  isSale: boolean;
  mainImage: string;
  sellerId: number;
  categoryId: number;

  createdAt: Date;
  updatedAt: Date;

  Seller?: Partial<Seller>;
  Category?: Partial<Category>;
}
