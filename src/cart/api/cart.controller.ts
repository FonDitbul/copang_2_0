import { Controller, DefaultValuePipe, Get, Inject, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ICartService } from '../domain/cart.service';
import { Buyer } from '../../buyer/api/buyer-info.decorator';
import { UserInfo } from '../../auth/domain/login.token';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';
import { CartFindAllRes } from './cart.res.dto';
import { CART_MAX_COUNT } from '../domain/cart';

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
}
