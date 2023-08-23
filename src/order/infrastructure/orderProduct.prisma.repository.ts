import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/infrastructure/prisma.service';
import { IOrderProductRepository } from '../domain/orderProduct.repository';
import { OrderProduct } from '../domain/orderProduct';

@Injectable()
export class OrderProductPrismaRepository implements IOrderProductRepository {
  constructor(private prisma: PrismaService) {}

  async findOneById(id: number): Promise<OrderProduct> {
    return this.prisma.orderProduct.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async updateByReview(id: number, reviewId: number) {
    return this.prisma.orderProduct.update({
      data: {
        reviewId,
      },
      where: {
        id,
      },
    });
  }
}
