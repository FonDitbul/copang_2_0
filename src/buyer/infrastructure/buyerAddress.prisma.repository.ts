import { Injectable } from '@nestjs/common';
import { IBuyerAddressRepository } from '../domain/buyerAddress.repository';
import { PrismaService } from '../../database/infrastructure/prisma.service';
import { BuyerAddress } from '../domain/buyerAddress';
import { BuyerCreateAddressOut } from '../domain/port/buyerAddress.out';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';

@Injectable()
export class BuyerAddressPrismaRepository implements IBuyerAddressRepository {
  constructor(private prisma: PrismaService) {}

  async getOneById(id: number): Promise<BuyerAddress> {
    const buyerAddress = await this.prisma.buyerAddress.findFirst({
      where: {
        id,
      },
    });
    if (!buyerAddress) {
      throw new CoPangException(EXCEPTION_STATUS.USER_ADDRESS_NOT_EXIST);
    }
    return buyerAddress;
  }

  getAllAddressByBuyerId(buyerId: number): Promise<BuyerAddress[]> {
    return this.prisma.buyerAddress.findMany({
      where: {
        buyerId,
      },
    });
  }

  async createAddress(createAddressOut: BuyerCreateAddressOut): Promise<void> {
    const { buyerId, address } = createAddressOut;
    await this.prisma.buyerAddress.create({
      data: {
        buyerId,
        address,
        isRepresentative: false,
      },
    });
    return;
  }

  async updateIsRepresentativeAddressById(id: number): Promise<void> {
    await this.prisma.buyerAddress.update({
      data: {
        isRepresentative: true,
      },
      where: {
        id,
      },
    });
  }

  async updatesIsNotRepresentativeAddressByBuyerId(buyerId: number): Promise<void> {
    await this.prisma.buyerAddress.updateMany({
      data: {
        isRepresentative: false,
      },
      where: {
        buyerId,
        deletedAt: null,
      },
    });
  }

  async deleteAddressById(id: number): Promise<void> {
    await this.prisma.buyerAddress.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id,
      },
    });
  }
}
