import { Body, Controller, Delete, Get, Inject, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';
import { Buyer } from './buyer-info.decorator';
import { UserInfo } from '../../auth/domain/login.token';
import { IBuyerAccountService } from '../domain/buyerAccount.service';
import { BuyerAccountAddressRes, BuyerAccountCardRes } from './buyerAccount.res.dto';
import { BuyerCreateAddressReq, BuyerDeleteAddressReq, BuyerUpdateRepresentativeAddressReq } from './buyerAccount.req.dto';

@Controller()
export class BuyerAccountController {
  constructor(@Inject('IBuyerAccountService') private buyerAccountService: IBuyerAccountService) {}

  @Get('/buyer/address')
  @UseGuards(AuthAuthorizationGuard)
  async getAddress(@Buyer() buyer: UserInfo): Promise<BuyerAccountAddressRes> {
    const buyerAddresses = await this.buyerAccountService.getAddressArray(buyer.id);

    return { buyerAddresses };
  }

  @Post('/buyer/address/add')
  @UseGuards(AuthAuthorizationGuard)
  async createAddress(@Buyer() buyer: UserInfo, @Body() createAddressReq: BuyerCreateAddressReq): Promise<void> {
    const buyerId = buyer.id;
    const address = createAddressReq.address;

    await this.buyerAccountService.createAddress({ buyerId, address });
    return;
  }

  @Patch('/buyer/address/representative')
  @UseGuards(AuthAuthorizationGuard)
  async updateRepresentativeAddress(@Buyer() buyer: UserInfo, @Body() representativeAddressReq: BuyerUpdateRepresentativeAddressReq): Promise<void> {
    const buyerId = buyer.id;
    const addressId = representativeAddressReq.id;

    await this.buyerAccountService.updateRepresentativeAddress({ buyerId, id: addressId });
    return;
  }

  @Delete('/buyer/address')
  @UseGuards(AuthAuthorizationGuard)
  async deleteAddress(@Buyer() buyer: UserInfo, @Body() deleteAddressReq: BuyerDeleteAddressReq): Promise<void> {
    const buyerId = buyer.id;
    const addressId = deleteAddressReq.id;

    await this.buyerAccountService.deleteAddress({ buyerId, id: addressId });
    return;
  }

  @Get('/buyer/card')
  @UseGuards(AuthAuthorizationGuard)
  async getCards(@Buyer() buyer: UserInfo): Promise<BuyerAccountCardRes> {
    const buyerCards = await this.buyerAccountService.getCardArray(buyer.id);

    return { buyerCards };
  }
  // buyer card 생성하기
  // buyer card 대표 설정하기
  // buyer card 삭제하기
}
