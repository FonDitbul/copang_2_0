export interface ICartFindAllIn {
  buyerId: number;
  limit: number;
  lastId: number;
}

export interface ICartAddIn {
  buyerId: number;
  productId: number;
  productQuantity: number;
}
export interface ICartChangeIn {
  id: number;
  buyerId: number;
  productQuantity: number;
  status: string;
}
