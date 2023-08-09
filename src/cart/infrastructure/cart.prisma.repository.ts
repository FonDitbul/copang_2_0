import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/infrastructure/prisma.service';
import { CartWhereCondition, ICartRepository } from '../domain/cart.repository';
import { ICartAddOut, ICartCountOut, ICartFindAllOut } from '../domain/port/cart.out';
import { Cart } from '../domain/cart';
import { removeUndefinedKey } from '../../util/json.util';

@Injectable()
export class CartPrismaRepository implements ICartRepository {
  constructor(private prisma: PrismaService) {}

  findOne(where: CartWhereCondition) {
    const whereCondition = removeUndefinedKey({
      ...where,
    });

    return this.prisma.cart.findFirst({
      where: {
        ...whereCondition,
      },
    });
  }

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

  async add(addOut: ICartAddOut): Promise<Cart> {
    const { buyerId, productId, productQuantity } = addOut;

    const cart = await this.prisma.cart.create({
      data: {
        buyerId,
        productId,
        productQuantity,
        status: 'ACTIVE',
      },
    });

    return cart;
  }
}
