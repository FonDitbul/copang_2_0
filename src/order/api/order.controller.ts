import { Body, Controller, DefaultValuePipe, Get, Inject, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';
import { Buyer } from '../../buyer/api/buyer-info.decorator';
import { UserInfo } from '../../auth/domain/login.token';
import { OrderBuyProductReq } from './order.req.dto';
import { IOrderService } from '../domain/order.service';
import { OrderFindAllRes } from './order.res.dto';
import { OrderProduct } from '../domain/orderProduct';

@Controller()
export class OrderController {
  constructor(@Inject('IOrderService') private orderService: IOrderService) {}

  @Post('/buyer/order/buy-product')
  @UseGuards(AuthAuthorizationGuard)
  async buyProduct(@Buyer() buyer: UserInfo, @Body() buyProductReq: OrderBuyProductReq) {
    await this.orderService.buy({
      buyerId: buyer.id,
      card: buyProductReq.card,
      address: buyProductReq.address,
      buyProduct: buyProductReq.products,
    });
    return true;
  }

  @Get('/buyer/order/product')
  @UseGuards(AuthAuthorizationGuard)
  async getOrderProduct(
    @Buyer() buyer: UserInfo,
    @Query('lastId', new DefaultValuePipe(0), ParseIntPipe) lastId: OrderProduct['id'],
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<OrderFindAllRes> {
    const orderProducts = await this.orderService.findAllOrderProduct({ buyerId: buyer.id, lastId, limit });

    return { orderProducts };
  }
}
