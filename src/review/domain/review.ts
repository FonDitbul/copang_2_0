import { Buyer } from '../../buyer/domain/buyer';

export interface Review {
  id: number;
  star: number;
  content: string;
  productId: number;
  buyerId: number;
  orderProductId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  Buyer?: Partial<Buyer>;
}
