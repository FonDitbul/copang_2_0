import { IBuyerCardRepository } from '../domain/buyerCard.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/infrastructure/prisma.service';
import { BuyerCard } from '../domain/buyerCard';
import { BuyerCreateCardOut } from '../domain/port/buyerAccount.out';

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

  async create(createCardOut: BuyerCreateCardOut): Promise<void> {
    const { buyerId, cardType, cardNumber, validityPeriod, bankName } = createCardOut;
    await this.prisma.buyerCard.create({
      data: {
        buyerId,
        bankName,
        validityPeriod,
        cardNumber,
        cardType,
        isRepresentative: false,
      },
    });
  }
}
