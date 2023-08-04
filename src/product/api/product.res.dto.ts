import { Product } from '@prisma/client';

export interface ProductFindAllRes {
  products: Product[];
  isEndPage: boolean;
}
