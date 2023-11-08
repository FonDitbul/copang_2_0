import { Inject, Injectable } from '@nestjs/common';
import { IOrderService } from '../domain/order.service';
import { OrderBuyIn } from '../domain/port/order.in';
import { OrderProduct } from '../domain/orderProduct';
import { IOrderProductRepository } from '../domain/orderProduct.repository';
import { OrderFindAllOrderProductIn } from '../domain/port/orderProduct.in';
import { CommandBus } from '@nestjs/cqrs';
import { OrderBuyCommand } from '../domain/order.buy.command';

@Injectable()
export class OrderService implements IOrderService {
  constructor(@Inject('IOrderProductRepository') private orderProductRepository: IOrderProductRepository, private commandBus: CommandBus) {}
  async buy(buyIn: OrderBuyIn): Promise<boolean> {
    await this.commandBus.execute(new OrderBuyCommand(buyIn));

    return true;
  }

  async findAllOrderProduct(findAllOrderProductIn: OrderFindAllOrderProductIn): Promise<OrderProduct[]> {
    const { buyerId, lastId, limit } = findAllOrderProductIn;

    const orderProducts = await this.orderProductRepository.findAllByBuyerIdNoOffset({ buyerId, lastId, limit });

    return orderProducts;
  }
}
