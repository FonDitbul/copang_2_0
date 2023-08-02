import { Product } from '@prisma/client';

export interface OrderBuyProduct {
  productId: number;
  quantity: number;
}
export type MergeOrderProduct = Product & {
  buyQuantity: number;
};
