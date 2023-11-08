import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/repository';
import { IOrderRepository } from '../domain/order.repository';
import { OrderBuyOut } from '../domain/port/order.out';
import { mapperOrderProduct } from '../domain/orderProduct';

@Injectable()
export class OrderPrismaRepository implements IOrderRepository {
  constructor(private prisma: PrismaService) {}
  async buy(orderBuy: OrderBuyOut) {
    return await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: { ...orderBuy.order, buyerId: orderBuy.buyerId },
      });

      const createOrderProductArray = orderBuy.buyProduct.map((product) => mapperOrderProduct(product, orderBuy.buyerId, order.id));

      await tx.orderProduct.createMany({
        data: createOrderProductArray,
      });

      await tx.orderPayment.create({
        data: { ...orderBuy.payment, orderId: order.id },
      });

      return order;
    });
  }
}
