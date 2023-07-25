import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/infrastructure/prisma.service';
import { ProductWhere } from '../domain/product.repository';
import { removeUndefinedKey } from '../../util/json.util';

@Injectable()
export class ProductPrismaRepository {
  constructor(private prisma: PrismaService) {}
  async findOne(where: ProductWhere) {
    const whereCondition = removeUndefinedKey({
      ...where,
      deletedAt: null,
    });
    return this.prisma.product.findFirst({
      where: {
        ...whereCondition,
      },
    });
  }
}
