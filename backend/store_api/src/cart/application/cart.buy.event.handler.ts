import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CartBuyEvent } from '../domain/cart.buy.event';

@EventsHandler(CartBuyEvent)
export class CartBuyEventHandler implements IEventHandler<CartBuyEvent> {
  async handle(event: CartBuyEvent) {
    console.log(event);
  }
}
