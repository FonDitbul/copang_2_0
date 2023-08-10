import { Product } from '@prisma/client';

export interface OrderBuyProduct {
  productId: number;
  buyQuantity: number;
}
export type MergeOrderProduct = Product & {
  buyQuantity: number;
};
