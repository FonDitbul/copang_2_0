import { Body, Controller, DefaultValuePipe, Get, Inject, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { SortType } from '../../common/domain/sort-type';
import { SortValidationPipe } from '../../common/api/pipe/sort-validation.pipe';
import { ReviewFindAllRes } from './review.res.dto';
import { IReviewService } from '../domain/review.service';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';
import { Buyer } from '../../buyer/api/buyer-info.decorator';
import { UserInfo } from '../../auth/domain/login.token';
import { ReviewCreateByBuyerReq } from './review.req.dto';

@Controller()
export class ReviewController {
  constructor(@Inject('IReviewService') private reviewService: IReviewService) {}
  @Get('/review/:productId')
  async findAllByProductId(
    @Param('productId', ParseIntPipe) productId: number,
    @Query('lastReviewId', new DefaultValuePipe(0), ParseIntPipe) lastReviewId: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('sort', new DefaultValuePipe('DESC'), SortValidationPipe) sort: SortType,
    @Query('sortColumn', new DefaultValuePipe('id')) sortColumn: string,
  ): Promise<ReviewFindAllRes> {
    const list = await this.reviewService.findAllByProductId({
      productId,
      lastReviewId,
      limit,
      sort,
      sortColumn,
    });

    return {
      list,
    };
  }

  @Post('/review/buyer')
  @UseGuards(AuthAuthorizationGuard)
  async createByBuyer(@Buyer() buyer: UserInfo, @Body() createByBuyerReq: ReviewCreateByBuyerReq) {
    const review = await this.reviewService.createByBuyer({ buyerId: buyer.id, ...createByBuyerReq });

    return review;
  }
}
