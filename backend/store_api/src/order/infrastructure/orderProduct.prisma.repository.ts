import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/repository';
import { IOrderProductRepository } from '../domain/orderProduct.repository';
import { OrderProduct } from '../domain/orderProduct';
import { OrderProductFindAllOut, OrderProductUpdateByReviewOut } from '../domain/port/orderProduct.out';

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

  async updateByReview(updateOut: OrderProductUpdateByReviewOut) {
    const { reviewId, id } = updateOut;
    return this.prisma.orderProduct.update({
      data: {
        reviewId,
      },
      where: {
        id,
      },
    });
  }

  findAllByBuyerIdNoOffset(findAllOut: OrderProductFindAllOut): Promise<OrderProduct[]> {
    const { buyerId, lastId, limit } = findAllOut;
    let whereCondition = {};

    if (lastId !== 0) {
      whereCondition = {
        id: {
          lt: lastId,
        },
      };
    }

    return this.prisma.orderProduct.findMany({
      where: {
        ...whereCondition,
        buyerId,
        deletedAt: null,
      },
      take: limit,
      orderBy: {
        id: 'desc',
      },
    });
  }
}
