import { Order } from '@prisma/client';

export interface IOrderRepository {
  findOne(): Promise<Order>;
}
