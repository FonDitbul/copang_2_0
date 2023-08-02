import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/infrastructure/prisma.service';
import { IOrderRepository } from '../domain/order.repository';

@Injectable()
export class OrderPrismaRepository implements IOrderRepository {
  constructor(private prisma: PrismaService) {}
  async findOne() {}
}
