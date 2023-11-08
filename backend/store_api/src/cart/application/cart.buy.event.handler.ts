import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CartBuyEvent } from '../domain/cart.buy.event';
import { Inject } from '@nestjs/common';
import { ICartRepository } from '../domain/cart.repository';

@EventsHandler(CartBuyEvent)
export class CartBuyEventHandler implements IEventHandler<CartBuyEvent> {
  constructor(@Inject('ICartRepository') private cartRepository: ICartRepository) {}
  async handle(event: CartBuyEvent) {
    if (event.productIdArray.length === 0) return;

    await this.cartRepository.deleteByBuy({ ...event });
  }
}
