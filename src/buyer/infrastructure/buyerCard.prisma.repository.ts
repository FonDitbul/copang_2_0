import { IBuyerCardRepository } from '../domain/buyerCard.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/infrastructure/prisma.service';
import { BuyerCard } from '../domain/buyerCard';
import { BuyerCreateCardOut } from '../domain/port/buyerAccount.out';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';
import { id } from 'date-fns/locale';

@Injectable()
export class BuyerCardPrismaRepository implements IBuyerCardRepository {
  constructor(private prisma: PrismaService) {}
  async getOneById(id: number): Promise<BuyerCard> {
    const buyerCard = await this.prisma.buyerCard.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!buyerCard) {
      throw new CoPangException(EXCEPTION_STATUS.USER_CARD_NOT_EXIST);
    }

    return buyerCard;
  }

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

  async updateIsRepresentativeById(id: number): Promise<void> {
    await this.prisma.buyerCard.update({
      data: {
        isRepresentative: true,
      },
      where: {
        id,
      },
    });
  }

  async updatesIsNotRepresentativeByBuyerId(buyerId: number): Promise<void> {
    await this.prisma.buyerCard.updateMany({
      data: {
        isRepresentative: false,
      },
      where: {
        buyerId,
        deletedAt: null,
      },
    });
    return Promise.resolve(undefined);
  }
}
