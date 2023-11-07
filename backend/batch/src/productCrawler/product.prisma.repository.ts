import { PrismaService } from '@libs/repository';
import { Injectable } from '@nestjs/common';
import { CreateProduct, ProductRepository } from './product.repository';

@Injectable()
export class ProductPrismaRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}
  async createMany(productArray: CreateProduct[]): Promise<void> {
    await this.prisma.product.createMany({ data: productArray, skipDuplicates: true });
    return;
  }
}
