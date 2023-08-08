import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/infrastructure/prisma.service';
import { ICartRepository } from '../domain/cart.repository';
import { ICartCountOut, ICartFindAllOut } from '../domain/port/cart.out';

@Injectable()
export class CartPrismaRepository implements ICartRepository {
  constructor(private prisma: PrismaService) {}

  async findAllByBuyerId(findAllOut: ICartFindAllOut) {
    const { buyerId, limit, lastId } = findAllOut;
    return this.prisma.cart.findMany({
      where: {
        buyerId,
        deletedAt: null,
      },
      take: limit,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
      orderBy: {
        id: 'desc',
      },
      include: {
        Product: {
          include: {
            Seller: {
              select: { id: true, ceoName: true, companyName: true, address: true },
            },
          },
        },
      },
    });
  }

  countByBuyerId(countOut: ICartCountOut): Promise<number> {
    const { buyerId, lastId } = countOut;
    return this.prisma.cart.count({
      where: {
        buyerId,
        id: {
          lt: lastId,
        },
        deletedAt: null,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
}
