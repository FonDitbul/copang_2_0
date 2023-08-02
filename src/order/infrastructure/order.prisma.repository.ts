import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/infrastructure/prisma.service';
import { IOrderRepository } from '../domain/order.repository';
import { OrderBuyOut } from '../domain/port/order.out';

@Injectable()
export class OrderPrismaRepository implements IOrderRepository {
  constructor(private prisma: PrismaService) {}
  async findOne() {
    return await this.prisma.order.findFirst();
  }
  async buy(orderBuy: OrderBuyOut) {
    return await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: { ...orderBuy.order, buyerId: orderBuy.buyerId },
      });

      const createOrderProductArray = orderBuy.buyProduct.map((product) => {
        return { ...product, buyerId: orderBuy.buyerId, orderId: order.id };
      });

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
