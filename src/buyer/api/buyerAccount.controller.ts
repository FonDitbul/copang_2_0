import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';
import { Buyer } from './buyer-info.decorator';
import { UserInfo } from '../../auth/domain/login.token';
import { IBuyerAccountService } from '../domain/buyerAccount.service';
import { BuyerAccountAddressRes } from './buyerAccount.res.dto';

@Controller()
export class BuyerAccountController {
  constructor(@Inject('IBuyerAccountService') private buyerAccountService: IBuyerAccountService) {}

  @Get('/buyer/address')
  @UseGuards(AuthAuthorizationGuard)
  async account(@Buyer() buyer: UserInfo): Promise<BuyerAccountAddressRes> {
    const buyerAddresses = await this.buyerAccountService.getAddressArray(buyer.id);

    return { buyerAddresses };
  }

  // buyerId가 가지고 있는 주소 추가하기
  // 대표 주소 설정하기
  // 주소 수정하기
  // 주소 삭제하기
}
