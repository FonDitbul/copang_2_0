import { CategoryRepository, CreateCategory } from './category.repository';
import { PrismaService } from '@libs/repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryPrismaRepository implements CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async createMany(categoryArray: CreateCategory[]): Promise<void> {
    await this.prisma.category.createMany({ data: categoryArray, skipDuplicates: true });
    return;
  }
}
