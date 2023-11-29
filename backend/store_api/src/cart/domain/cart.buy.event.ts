import { Cart } from './cart';
import { ICartDeleteByBuyOut } from './port/cart.out';

export class CartBuyEvent implements ICartDeleteByBuyOut {
  constructor(public readonly buyerId: Cart['buyerId'], public readonly productIdArray: Cart['productId'][]) {}
}
