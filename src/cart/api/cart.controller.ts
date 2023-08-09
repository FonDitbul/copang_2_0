import { Body, Controller, DefaultValuePipe, Get, Inject, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ICartService } from '../domain/cart.service';
import { Buyer } from '../../buyer/api/buyer-info.decorator';
import { UserInfo } from '../../auth/domain/login.token';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';
import { CartAddRes, CartChangeRes, CartFindAllRes } from './cart.res.dto';
import { CART_MAX_COUNT } from '../domain/cart';
import { CartAddReq, CartChangeReq } from './cart.req.dto';

@Controller()
export class CartController {
  constructor(@Inject('ICartService') private cartService: ICartService) {}

  @Get('/cart/list')
  @UseGuards(AuthAuthorizationGuard)
  async findAll(
    @Buyer() buyer: UserInfo,
    @Query('limit', new DefaultValuePipe(CART_MAX_COUNT), ParseIntPipe) limit: number,
    @Query('lastId', new DefaultValuePipe(0), ParseIntPipe) lastId: number,
  ): Promise<CartFindAllRes> {
    const buyerId = buyer.id;
    const { carts, isEndPage } = await this.cartService.findAll({ buyerId, limit, lastId });

    return { carts, isEndPage };
  }

  @Post('/cart/add')
  @UseGuards(AuthAuthorizationGuard)
  async add(@Buyer() buyer: UserInfo, @Body() addReq: CartAddReq): Promise<CartAddRes> {
    const cart = await this.cartService.add({ buyerId: buyer.id, ...addReq });
    return { cart };
  }

  @Patch('/cart')
  @UseGuards(AuthAuthorizationGuard)
  async change(@Buyer() buyer: UserInfo, @Body() changeReq: CartChangeReq): Promise<CartChangeRes> {
    const cart = await this.cartService.change({ buyerId: buyer.id, ...changeReq });
    return { cart };
  }
}
