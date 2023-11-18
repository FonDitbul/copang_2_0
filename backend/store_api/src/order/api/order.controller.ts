import { Body, Controller, DefaultValuePipe, Get, Inject, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';
import { BuyerUser } from '../../buyer/api/buyer-info.decorator';
import { UserInfo } from '../../auth/domain/login.token';
import { OrderBuyProductReq } from './order.req.dto';
import { IOrderService } from '../domain/order.service';
import { OrderFindAllRes } from './order.res.dto';
import { OrderProduct } from '../domain/orderProduct';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';

@ApiTags('Order')
@ApiBearerAuth('access-token')
@Controller()
export class OrderController {
  constructor(@Inject('IOrderService') private orderService: IOrderService) {}

  @ApiOperation({ summary: '구매자 (유저) 물품 주문', description: '해당 물품을 구매하는 API' })
  @ApiCreatedResponse({ description: '주문 성공' })
  // ------------------------------------------------------------------------------------------
  @Post('/buyer/order/buy-product')
  @UseGuards(AuthAuthorizationGuard)
  async buyProduct(@BuyerUser() buyer: UserInfo, @Body() buyProductReq: OrderBuyProductReq) {
    await this.orderService.buy({
      buyerId: buyer.id,
      card: buyProductReq.card,
      address: buyProductReq.address,
      buyProduct: buyProductReq.products,
    });
    return true;
  }

  @ApiOperation({ summary: '구매자 (유저) 물품 주문한 이력 조회', description: '주문 history API' })
  @ApiQuery({ type: Number, name: 'lastId', required: false, description: '마지막 order product id 이후 조회' })
  @ApiQuery({ type: Number, name: 'limit', required: false, description: '가져올 개수 제한' })
  @ApiOkResponse({ type: OrderFindAllRes, description: '구매 물품 조회 성공' })
  // ------------------------------------------------------------------------------------------
  @Get('/buyer/order/product')
  @UseGuards(AuthAuthorizationGuard)
  async getOrderProduct(
    @BuyerUser() buyer: UserInfo,
    @Query('lastId', new DefaultValuePipe(0), ParseIntPipe) lastId: OrderProduct['id'],
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<OrderFindAllRes> {
    const orderProducts = await this.orderService.findAllOrderProduct({ buyerId: buyer.id, lastId, limit });

    return { orderProducts };
  }
}
