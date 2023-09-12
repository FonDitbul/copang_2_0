import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';
import { Buyer } from './buyer-info.decorator';
import { UserInfo } from '../../auth/domain/login.token';
import { IBuyerAccountService } from '../domain/buyerAccount.service';
import { BuyerAccountAddressRes } from './buyerAccount.res.dto';
import { BuyerCreateAddressReq } from './buyerAccount.req.dto';

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
  // 대표 주소 설정하기
  // 주소 수정하기
  // 주소 삭제하기
}
