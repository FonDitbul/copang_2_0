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
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';

@ApiTags('BuyerAccount')
@Controller()
export class BuyerAccountController {
  constructor(@Inject('IBuyerAccountService') private buyerAccountService: IBuyerAccountService) {}

  @ApiOperation({ summary: '구매자 주소 목록 불러오기', description: '저장되어 있는 주소 목록을 불러옵니다.' })
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    type: BuyerAccountAddressRes,
    description: '주소 목록 조회 성공',
  })
  // ------------------------------------------------------------------------------------------
  @Get('/buyer/address')
  @UseGuards(AuthAuthorizationGuard)
  async getAddress(@BuyerUser() buyer: UserInfo): Promise<BuyerAccountAddressRes> {
    const buyerAddresses = await this.buyerAccountService.getAddressArray(buyer.id);

    return { buyerAddresses };
  }

  @ApiOperation({ summary: '구매자 주소 목록 저장하기', description: '유저에게 입력받은 주소를 저장합니다.' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: '주소 저장 성공',
  })
  // ------------------------------------------------------------------------------------------
  @Post('/buyer/address/add')
  @UseGuards(AuthAuthorizationGuard)
  async createAddress(@BuyerUser() buyer: UserInfo, @Body() createAddressReq: BuyerCreateAddressReq): Promise<void> {
    const buyerId = buyer.id;
    const address = createAddressReq.address;

    await this.buyerAccountService.createAddress({ buyerId, address });
    return;
  }

  @ApiOperation({ summary: '구매자 대표 주소 변경하기', description: '구매자의 주소중 하나를 대표 주소로 변경합니다.' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: '대표 주소 변경 성공',
  })
  // ------------------------------------------------------------------------------------------
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

  @ApiOperation({ summary: '구매자 주소 삭제하기', description: '구매자 주소 soft delete' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: '삭제 성공',
  })
  // ------------------------------------------------------------------------------------------
  @Delete('/buyer/address')
  @UseGuards(AuthAuthorizationGuard)
  async deleteAddress(@BuyerUser() buyer: UserInfo, @Body() deleteAddressReq: BuyerDeleteAddressReq): Promise<void> {
    const buyerId = buyer.id;
    const addressId = deleteAddressReq.id;

    await this.buyerAccountService.deleteAddress({ buyerId, id: addressId });
    return;
  }

  @ApiOperation({ summary: '구매자 카드 목록 불러오기', description: '저장되어 있는 카드 목록을 불러옵니다.' })
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    type: BuyerAccountCardRes,
    description: '카드 목록 조회 성공',
  })
  // ------------------------------------------------------------------------------------------
  @Get('/buyer/card')
  @UseGuards(AuthAuthorizationGuard)
  async getCards(@BuyerUser() buyer: UserInfo): Promise<BuyerAccountCardRes> {
    const buyerCards = await this.buyerAccountService.getCardArray(buyer.id);

    return { buyerCards };
  }

  @ApiOperation({ summary: '구매자 카드 목록 저장하기', description: '유저에게 입력받은 카드를 저장합니다.' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: '카드 저장 성공',
  })
  // ------------------------------------------------------------------------------------------
  @Post('/buyer/card/add')
  @UseGuards(AuthAuthorizationGuard)
  async createCard(@BuyerUser() buyer: UserInfo, @Body() createCardReq: BuyerCreateCardReq): Promise<void> {
    const buyerId = buyer.id;
    const card = createCardReq.card;
    await this.buyerAccountService.createCard({ buyerId, card });
  }

  @ApiOperation({ summary: '구매자 대표 카드 변경하기', description: '구매자의 카드중 하나를 대표 카드로 변경합니다.' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: '대표 카드 변경 성공',
  })
  // ------------------------------------------------------------------------------------------
  @Patch('/buyer/card/representative')
  @UseGuards(AuthAuthorizationGuard)
  async updateRepresentativeCard(@BuyerUser() buyer: UserInfo, @Body() representativeCardReq: BuyerUpdateRepresentativeCardReq): Promise<void> {
    const buyerId = buyer.id;
    const id = representativeCardReq.id;
    await this.buyerAccountService.updateRepresentativeCard({ buyerId, id });
  }

  @ApiOperation({ summary: '구매자 카드 삭제하기', description: '구매자 카드 soft delete' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: '삭제 성공',
  })
  // ------------------------------------------------------------------------------------------
  @Delete('/buyer/card')
  @UseGuards(AuthAuthorizationGuard)
  async deleteCard(@BuyerUser() buyer: UserInfo, @Body() deleteCardReq: BuyerDeleteCardReq): Promise<void> {
    const buyerId = buyer.id;
    const addressId = deleteCardReq.id;

    await this.buyerAccountService.deleteCard({ buyerId, id: addressId });
    return;
  }
}
