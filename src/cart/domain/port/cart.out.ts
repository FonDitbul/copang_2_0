export interface ICartFindAllOut {
  buyerId: number;
  limit: number;
  lastId: number;
}

export interface ICartCountOut {
  buyerId: number;
  lastId: number;
}

export interface ICartAddOut {
  buyerId: number;
  productId: number;
  productQuantity: number;
}
