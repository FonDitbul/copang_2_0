export interface Review {
  id: number;
  star: number;
  content: string;
  productId: number;
  userId: number;
  userType: string;
  parentId: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
