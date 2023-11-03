import { PrismaService } from '@libs/repository';
import { OrderProductRepository } from './orderProduct.repository';
import { OrderProduct } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderProductPrismaRepository implements OrderProductRepository {
  constructor(private prisma: PrismaService) {}

  async findAllReady(): Promise<OrderProduct[]> {
    return this.prisma.orderProduct.findMany({
      where: {
        shippingStatus: 'SHIPPING_READY',
        deletedAt: null,
      },
    });
  }

  findAllShipping(): Promise<OrderProduct[]> {
    return this.prisma.orderProduct.findMany({
      where: {
        shippingStatus: 'SHIPPING',
        deletedAt: null,
      },
    });
  }

  async updateToShipping(idArray: OrderProduct['id'][]): Promise<void> {
    await this.prisma.orderProduct.updateMany({
      data: {
        shippingStatus: 'SHIPPING',
      },
      where: {
        id: { in: idArray },
      },
    });
  }

  async updateToShippingComplete(idArray: OrderProduct['id'][]): Promise<void> {
    await this.prisma.orderProduct.updateMany({
      data: {
        shippingStatus: 'SHIPPING_COMPLETE',
      },
      where: {
        id: { in: idArray },
      },
    });
  }
}
