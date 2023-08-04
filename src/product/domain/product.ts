import { Seller } from '../../seller/domain/seller';

export interface Product {
  id: number;
  name: string;
  code: string;
  description: string;
  information: string;
  quantity: number;
  cost: number;
  isSale: boolean;
  sellerId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  Seller?: Partial<Seller>;
}
