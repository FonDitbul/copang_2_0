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
}
