import { Injectable } from '@nestjs/common';
import { IBuyerAddressRepository } from '../domain/buyerAddress.repository';
import { PrismaService } from '../../database/infrastructure/prisma.service';
import { BuyerAddress } from '../domain/buyerAddress';
import { BuyerCreateAddressOut } from '../domain/port/buyerAddress.out';

@Injectable()
export class BuyerAddressPrismaRepository implements IBuyerAddressRepository {
  constructor(private prisma: PrismaService) {}

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
}
