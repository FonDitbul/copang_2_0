import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/repository';
import { Buyer as BuyerEntity } from '@prisma/client';
import { BuyerWhere, IBuyerRepository } from '../domain/buyer.repository';
import {
  BuyerChangeEmailOut,
  BuyerChangeNickNameOut,
  BuyerChangePasswordOut,
  BuyerChangePhoneNumberOut,
  BuyerSignUpOut,
} from '../domain/port/buyer.out';
import { removeUndefinedKey } from '@libs/utils';

@Injectable()
export class BuyerPrismaRepository implements IBuyerRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(where: BuyerWhere): Promise<BuyerEntity | null> {
    const whereCondition = removeUndefinedKey({
      ...where,
      deletedAt: null,
    });
    return this.prisma.buyer.findFirst({
      where: {
        ...whereCondition,
      },
    });
  }

  async signUp(buyerSignUpOut: BuyerSignUpOut): Promise<BuyerEntity> {
    return this.prisma.buyer.create({
      data: {
        ...buyerSignUpOut,
      },
    });
  }

  async changePassword(changePasswordOut: BuyerChangePasswordOut): Promise<BuyerEntity> {
    return this.prisma.buyer.update({
      where: {
        id: changePasswordOut.id,
      },
      data: {
        password: changePasswordOut.password,
      },
    });
  }

  async changeNickName(changeNickNameOut: BuyerChangeNickNameOut): Promise<BuyerEntity> {
    return this.prisma.buyer.update({
      where: {
        id: changeNickNameOut.id,
      },
      data: {
        nickName: changeNickNameOut.nickName,
      },
    });
  }

  async changeEmail(changeNickNameOut: BuyerChangeEmailOut): Promise<BuyerEntity> {
    return this.prisma.buyer.update({
      where: {
        id: changeNickNameOut.id,
      },
      data: {
        email: changeNickNameOut.email,
      },
    });
  }

  async changePhoneNumber(changeNickNameOut: BuyerChangePhoneNumberOut): Promise<BuyerEntity> {
    return this.prisma.buyer.update({
      where: {
        id: changeNickNameOut.id,
      },
      data: {
        phoneNumber: changeNickNameOut.phoneNumber,
      },
    });
  }
}
