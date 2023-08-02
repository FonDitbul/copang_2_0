export interface Order {
  id: number;
  code: string;
  name: string;
  buyerId: number;
  status: string;
  totalCost: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
