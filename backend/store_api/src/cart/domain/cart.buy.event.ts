import { Cart } from './cart';

export class CartBuyEvent {
  constructor(public readonly buyerId: Cart['buyerId'], public readonly productIdArray: Cart['productId'][]) {}
}
