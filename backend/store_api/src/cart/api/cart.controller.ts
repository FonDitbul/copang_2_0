import { Body, Controller, DefaultValuePipe, Delete, Get, Inject, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ICartService } from '../domain/cart.service';
import { BuyerUser } from '../../buyer/api/buyer-info.decorator';
import { UserInfo } from '../../auth/domain/login.token';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';
import { CartFindAllRes } from './cart.res.dto';
import { Cart, CART_MAX_COUNT } from '../domain/cart';
import { CartAddReq, CartChangeReq, CartDeleteReq } from './cart.req.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';

@ApiTags('Cart')
@ApiBearerAuth('access-token')
@Controller()
export class CartController {
  constructor(@Inject('ICartService') private cartService: ICartService) {}

  @ApiOperation({ summary: '장바구니 조회하기 ', description: '유저가 장바구니에 담은 데이터를 조회합니다.' })
  @ApiQuery({
    type: Number,
    name: 'limit',
    required: false,
    description: '가져오고자 하는 장바구니 개수',
  })
  @ApiQuery({
    type: Number,
    name: 'lastId',
    required: false,
    description: '해당 장바구니 마지막 Id, 전송 시 이후 id부터 조회 (No Offset)',
  })
  @ApiOkResponse({ type: CartFindAllRes, description: '조회 성공' })
  // ------------------------------------------------------------------------------------------
  @Get('/cart/list')
  @UseGuards(AuthAuthorizationGuard)
  async findAll(
    @BuyerUser() buyer: UserInfo,
    @Query('limit', new DefaultValuePipe(CART_MAX_COUNT), ParseIntPipe) limit: number,
    @Query('lastId', new DefaultValuePipe(0), ParseIntPipe) lastId: Cart['id'],
  ): Promise<CartFindAllRes> {
    const buyerId = buyer.id;
    const { carts, isEndPage } = await this.cartService.findAll({ buyerId, limit, lastId });

    return { carts, isEndPage };
  }

  @ApiOperation({ summary: '장바구니 추가하기 ', description: '장바구니 담기 API' })
  @ApiCreatedResponse({ description: '추가 성공' })
  @ApiInternalServerErrorResponse({ description: '존재하지 않는 cart id일 경우, 해당 cart id의 buyerId와 token 의 id가 동일하지 않을 경우' })
  // ------------------------------------------------------------------------------------------
  @Post('/cart/add')
  @UseGuards(AuthAuthorizationGuard)
  async add(@BuyerUser() buyer: UserInfo, @Body() addReq: CartAddReq): Promise<void> {
    await this.cartService.add({ buyerId: buyer.id, ...addReq });
    return;
  }

  @ApiOperation({ summary: '장바구니 변경하기 ', description: '장바구니 상태 변경 API' })
  @ApiCreatedResponse({ description: '변경 성공' })
  @ApiInternalServerErrorResponse({ description: '존재하지 않는 cart id일 경우, 해당 cart id의 buyerId와 token 의 id가 동일하지 않을 경우' })
  // ------------------------------------------------------------------------------------------
  @Patch('/cart')
  @UseGuards(AuthAuthorizationGuard)
  async change(@BuyerUser() buyer: UserInfo, @Body() changeReq: CartChangeReq): Promise<void> {
    await this.cartService.change({ buyerId: buyer.id, ...changeReq });
    return;
  }

  @ApiOperation({ summary: '장바구니 삭제하기 ', description: '장바구니 soft delete 변경 API' })
  @ApiCreatedResponse({ description: '삭제 성공' })
  @ApiInternalServerErrorResponse({ description: '존재하지 않는 cart id일 경우, 해당 cart id의 buyerId와 token 의 id가 동일하지 않을 경우' }) // ------------------------------------------------------------------------------------------
  @Delete('/cart')
  @UseGuards(AuthAuthorizationGuard)
  async delete(@BuyerUser() buyer: UserInfo, @Body() deleteReq: CartDeleteReq): Promise<void> {
    await this.cartService.delete({ buyerId: buyer.id, ...deleteReq });
    return;
  }
}
