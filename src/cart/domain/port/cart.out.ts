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

export interface ICartChangeOut {
  id: number;
  productQuantity: number;
  status: string;
}

export interface ICartDeleteOut {
  id: number;
}

export interface ICartDeleteByBuyOut {
  buyerId: number;
  productIdArray: number[];
}
