import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { OrderBuyCommand } from '../domain/order.buy.command';
import { Inject } from '@nestjs/common';
import { IOrderRepository } from '../domain/order.repository';
import { IOrderProductRepository } from '../domain/orderProduct.repository';
import { IProductRepository } from '../../product/domain/product.repository';
import { IOrderPaymentServer } from '../domain/order.payment.server';
import { CartBuyEvent } from '../../cart/domain/cart.buy.event';

@CommandHandler(OrderBuyCommand)
export class OrderBuyHandler implements ICommandHandler<OrderBuyCommand> {
  constructor(
    @Inject('IOrderRepository') private orderRepository: IOrderRepository,
    @Inject('IOrderProductRepository') private orderProductRepository: IOrderProductRepository,
    @Inject('IProductRepository') private productRepository: IProductRepository,
    @Inject('IOrderPaymentServer') private orderPaymentServer: IOrderPaymentServer,
    private eventBus: EventBus,
  ) {}

  async execute(command: OrderBuyCommand) {
    // TODO Service Logic
    console.log(command);
    this.eventBus.publish(new CartBuyEvent(1, []));
  }
}
