import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from '../domain/cart.repository';
import { ICartService } from '../domain/cart.service';
import { ICartFindAllIn } from '../domain/port/cart.in';

@Injectable()
export class CartService implements ICartService {
  constructor(@Inject('ICartRepository') private cartRepository: ICartRepository) {}

  async findAll(findAllIn: ICartFindAllIn) {
    const carts = await this.cartRepository.findAllByBuyerId({ ...findAllIn });

    let isEndPage = true;
    if (carts.length !== 0) {
      const lastCartId = carts[carts.length - 1].id;
      const cartNextCount = await this.cartRepository.countByBuyerId({
        buyerId: findAllIn.buyerId,
        lastId: lastCartId,
      });
      isEndPage = cartNextCount < findAllIn.limit ? true : false;
    }

    return { carts, isEndPage };
  }
}
