import { Controller, DefaultValuePipe, Get, Inject, Param, ParseIntPipe, Query } from '@nestjs/common';
import { SortType } from '../../common/domain/sort-type';
import { SortValidationPipe } from '../../common/api/pipe/sort-validation.pipe';
import { ReviewFindAllRes } from './review.res.dto';
import { IReviewService } from '../domain/review.service';

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
}
