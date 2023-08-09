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
