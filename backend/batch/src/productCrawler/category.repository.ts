import { Category } from '@prisma/client';

export interface CreateCategory {
  code: string;
  name: string;
}

export interface CategoryRepository {
  createMany(categoryArray: CreateCategory[]): Promise<void>;
  findAll(): Promise<Category[]>;
}
