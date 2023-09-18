import {Product} from "./Product";

export interface Cart {
  id: number;
  productQuantity: number;
  status: string;
  buyerId: number;
  productId: number;
  createdAt: Date;
  updatedAt: Date;

  Product?: Product
}
