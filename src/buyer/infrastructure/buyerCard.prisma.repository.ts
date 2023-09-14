import { IBuyerCardRepository } from '../domain/buyerCard.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/infrastructure/prisma.service';
import { BuyerCard } from '../domain/buyerCard';

@Injectable()
export class BuyerCardPrismaRepository implements IBuyerCardRepository {
  constructor(private prisma: PrismaService) {}
  getAllByBuyerId(buyerId: number): Promise<BuyerCard[]> {
    return this.prisma.buyerCard.findMany({
      where: {
        buyerId,
        deletedAt: null,
      },
    });
  }
}
