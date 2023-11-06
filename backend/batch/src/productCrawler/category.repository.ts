export interface CreateCategory {
  code: string;
  name: string;
}

export interface CategoryRepository {
  createMany(categoryArray: CreateCategory[]): Promise<void>;
}
