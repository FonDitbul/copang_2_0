import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';
import { Buyer } from '../../buyer/api/buyer-info.decorator';
import { UserInfo } from '../../auth/domain/login.token';
import { OrderBuyProductReq } from './order.req.dto';
import { IOrderService } from '../domain/order.service';

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
      buyProduct: buyProductReq.product,
    });
    return true;
  }
}
