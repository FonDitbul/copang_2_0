import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/repository';
import { IProductRepository, ProductWhere } from '../domain/product.repository';
import { removeUndefinedKey } from '@libs/utils';
import { IProductFindAllOut } from '../domain/port/product.out';

@Injectable()
export class ProductPrismaRepository implements IProductRepository {
  constructor(private prisma: PrismaService) {}
  async findOne(where: ProductWhere) {
    const whereCondition = removeUndefinedKey({
      ...where,
    });
    return this.prisma.product.findFirst({
      where: {
        ...whereCondition,
      },
    });
  }

  async countForSale(findAllOut: IProductFindAllOut) {
    const { searchName, lastProductId } = findAllOut;

    let whereCondition = {};
    if (searchName) {
      whereCondition = {
        name: { contains: searchName },
      };
    }
    return this.prisma.product.count({
      where: {
        id: {
          lt: lastProductId,
        },
        ...whereCondition,
        isSale: true,
        deletedAt: null,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findAllForSale(findAllOut: IProductFindAllOut) {
    const { page, limit, searchName } = findAllOut;

    let whereCondition = {};
    if (searchName) {
      whereCondition = {
        name: { contains: searchName },
      };
    }

    const product = await this.prisma.product.findMany({
      where: {
        ...whereCondition,
        isSale: true,
        deletedAt: null,
      },
      include: {
        Seller: { select: { id: true, ceoName: true, companyName: true, address: true } },
      },
      orderBy: {
        id: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return product;
  }

  async findAllById(idArray: number[]) {
    return this.prisma.product.findMany({
      where: {
        id: {
          in: idArray,
        },
      },
    });
  }
}
