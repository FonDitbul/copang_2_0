import { Body, Controller, DefaultValuePipe, Get, Inject, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { SortType } from '../../common/domain/sort-type';
import { SortValidationPipe } from '../../common/api/pipe/sort-validation.pipe';
import { ReviewFindAllRes } from './review.res.dto';
import { IReviewService } from '../domain/review.service';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';
import { BuyerUser } from '../../buyer/api/buyer-info.decorator';
import { UserInfo } from '../../auth/domain/login.token';
import { ReviewCreateByBuyerReq } from './review.req.dto';
import { Review } from '../domain/review';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';

@ApiTags('Review')
@Controller()
export class ReviewController {
  constructor(@Inject('IReviewService') private reviewService: IReviewService) {}

  @ApiOperation({ summary: '리뷰 불러오기', description: '해당 물품의 review 전부 불러오기' })
  @ApiParam({ type: Number, name: 'productId', required: false, description: '검색하고자 하는 물품(product) id' })
  @ApiQuery({ type: Number, name: 'lastReviewId', required: false, description: '해당 review 이후 조회 id' })
  @ApiQuery({ type: Number, name: 'limit', required: false, description: '가져올 개수 제한 default 10' })
  @ApiQuery({ type: String, name: 'sort', required: false, description: 'DESC 내림차순 ASC 오름차순' })
  @ApiQuery({ type: String, name: 'sortColumn', required: false, description: '가져올 개수 제한 default 10' })
  @ApiOkResponse({ type: ReviewFindAllRes, description: '조회 성공' })
  // ------------------------------------------------------------------------------------------
  @Get('/review/:productId')
  async findAllByProductId(
    @Param('productId', ParseIntPipe) productId: Review['productId'],
    @Query('lastReviewId', new DefaultValuePipe(0), ParseIntPipe) lastReviewId: Review['id'],
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

  @ApiOperation({ summary: '리뷰 작성하기', description: '해당 물품 구매 후 리뷰 작성' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ description: '생성 성공' })
  // ------------------------------------------------------------------------------------------
  @Post('/review/buyer')
  @UseGuards(AuthAuthorizationGuard)
  async createByBuyer(@BuyerUser() buyer: UserInfo, @Body() createByBuyerReq: ReviewCreateByBuyerReq) {
    await this.reviewService.createByBuyer({ buyerId: buyer.id, ...createByBuyerReq });
  }
}
