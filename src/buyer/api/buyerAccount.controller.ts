import { Body, Controller, Get, Inject, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';
import { Buyer } from './buyer-info.decorator';
import { UserInfo } from '../../auth/domain/login.token';
import { IBuyerAccountService } from '../domain/buyerAccount.service';
import { BuyerAccountAddressRes } from './buyerAccount.res.dto';
import { BuyerCreateAddressReq, BuyerUpdateRepresentativeAddressReq } from './buyerAccount.req.dto';

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

  // 주소 삭제하기
}
