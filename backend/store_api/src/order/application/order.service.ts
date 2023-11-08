import { Inject, Injectable } from '@nestjs/common';
import { IOrderService } from '../domain/order.service';
import { OrderBuyIn } from '../domain/port/order.in';
import { OrderProduct } from '../domain/orderProduct';
import { IOrderProductRepository } from '../domain/orderProduct.repository';
import { OrderFindAllOrderProductIn } from '../domain/port/orderProduct.in';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { OrderBuyCommand } from '../domain/order.buy.command';
import { CartBuyEvent } from '../../cart/domain/cart.buy.event';
import { OrderBuyOut } from '../domain/port/order.out';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject('IOrderProductRepository') private orderProductRepository: IOrderProductRepository,
    private commandBus: CommandBus,
    private eventBus: EventBus,
  ) {}
  async buy(buyIn: OrderBuyIn): Promise<boolean> {
    const buyResult: OrderBuyOut = await this.commandBus.execute(new OrderBuyCommand(buyIn));

    const resultProductIdArray = buyResult.buyProduct.map((product) => product.productId);

    await this.eventBus.publish(new CartBuyEvent(buyResult.buyerId, resultProductIdArray));

    return true;
  }

  async findAllOrderProduct(findAllOrderProductIn: OrderFindAllOrderProductIn): Promise<OrderProduct[]> {
    const { buyerId, lastId, limit } = findAllOrderProductIn;

    const orderProducts = await this.orderProductRepository.findAllByBuyerIdNoOffset({ buyerId, lastId, limit });

    return orderProducts;
  }
}
