import { Body, Controller, Delete, Get, Inject, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';
import { BuyerUser } from './buyer-info.decorator';
import { UserInfo } from '../../auth/domain/login.token';
import { IBuyerAccountService } from '../domain/buyerAccount.service';
import { BuyerAccountAddressRes, BuyerAccountCardRes } from './buyerAccount.res.dto';
import {
  BuyerCreateAddressReq,
  BuyerCreateCardReq,
  BuyerDeleteAddressReq,
  BuyerDeleteCardReq,
  BuyerUpdateRepresentativeAddressReq,
  BuyerUpdateRepresentativeCardReq,
} from './buyerAccount.req.dto';

@Controller()
export class BuyerAccountController {
  constructor(@Inject('IBuyerAccountService') private buyerAccountService: IBuyerAccountService) {}

  @Get('/buyer/address')
  @UseGuards(AuthAuthorizationGuard)
  async getAddress(@BuyerUser() buyer: UserInfo): Promise<BuyerAccountAddressRes> {
    const buyerAddresses = await this.buyerAccountService.getAddressArray(buyer.id);

    return { buyerAddresses };
  }

  @Post('/buyer/address/add')
  @UseGuards(AuthAuthorizationGuard)
  async createAddress(@BuyerUser() buyer: UserInfo, @Body() createAddressReq: BuyerCreateAddressReq): Promise<void> {
    const buyerId = buyer.id;
    const address = createAddressReq.address;

    await this.buyerAccountService.createAddress({ buyerId, address });
    return;
  }

  @Patch('/buyer/address/representative')
  @UseGuards(AuthAuthorizationGuard)
  async updateRepresentativeAddress(
    @BuyerUser() buyer: UserInfo,
    @Body() representativeAddressReq: BuyerUpdateRepresentativeAddressReq,
  ): Promise<void> {
    const buyerId = buyer.id;
    const addressId = representativeAddressReq.id;

    await this.buyerAccountService.updateRepresentativeAddress({ buyerId, id: addressId });
    return;
  }

  @Delete('/buyer/address')
  @UseGuards(AuthAuthorizationGuard)
  async deleteAddress(@BuyerUser() buyer: UserInfo, @Body() deleteAddressReq: BuyerDeleteAddressReq): Promise<void> {
    const buyerId = buyer.id;
    const addressId = deleteAddressReq.id;

    await this.buyerAccountService.deleteAddress({ buyerId, id: addressId });
    return;
  }

  @Get('/buyer/card')
  @UseGuards(AuthAuthorizationGuard)
  async getCards(@BuyerUser() buyer: UserInfo): Promise<BuyerAccountCardRes> {
    const buyerCards = await this.buyerAccountService.getCardArray(buyer.id);

    return { buyerCards };
  }

  @Post('/buyer/card/add')
  @UseGuards(AuthAuthorizationGuard)
  async createCard(@BuyerUser() buyer: UserInfo, @Body() createCardReq: BuyerCreateCardReq): Promise<void> {
    const buyerId = buyer.id;
    const card = createCardReq.card;
    await this.buyerAccountService.createCard({ buyerId, card });
  }

  @Patch('/buyer/card/representative')
  @UseGuards(AuthAuthorizationGuard)
  async updateRepresentativeCard(@BuyerUser() buyer: UserInfo, @Body() representativeCardReq: BuyerUpdateRepresentativeCardReq): Promise<void> {
    const buyerId = buyer.id;
    const id = representativeCardReq.id;
    await this.buyerAccountService.updateRepresentativeCard({ buyerId, id });
  }

  @Delete('/buyer/card')
  @UseGuards(AuthAuthorizationGuard)
  async deleteCard(@BuyerUser() buyer: UserInfo, @Body() deleteCardReq: BuyerDeleteCardReq): Promise<void> {
    const buyerId = buyer.id;
    const addressId = deleteCardReq.id;

    await this.buyerAccountService.deleteCard({ buyerId, id: addressId });
    return;
  }
}
