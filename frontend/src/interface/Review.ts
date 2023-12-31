import { Buyer } from './Buyer';

export interface Review {
  id: number;
  star: number;
  content: string;
  productId: number;
  buyerId: number;
  orderProductId: number;
  createdAt: Date;
  updatedAt: Date;

  Buyer?: Partial<Buyer>;
}
