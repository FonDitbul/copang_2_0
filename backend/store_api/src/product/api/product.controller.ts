import { Controller, DefaultValuePipe, Get, Inject, ParseIntPipe, Query } from '@nestjs/common';
import { ProductFindAllRes, ProductFindOneRes } from './product.res.dto';
import { IProductService } from '../domain/product.service';
import { Product } from '../domain/product';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';

@ApiTags('Product')
@Controller()
export class ProductController {
  constructor(@Inject('IProductService') private productService: IProductService) {}

  @ApiOperation({ summary: '판매 중 물품 조회', description: '물품 조회 API' })
  @ApiQuery({ type: Number, name: 'page', required: false, description: '페이지 default 1' })
  @ApiQuery({ type: Number, name: 'limit', required: false, description: '가져올 개수 제한 default 10' })
  @ApiQuery({ type: String, name: 'searchName', required: false, description: '검색하고자 하는 이름' })
  @ApiOkResponse({ type: ProductFindAllRes, description: '구매 물품 조회 성공' })
  // ------------------------------------------------------------------------------------------
  @Get('product/sale')
  async findAllForSale(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('searchName') searchName?: Product['name'],
  ): Promise<ProductFindAllRes> {
    const { products, isEndPage } = await this.productService.findAllForSale({ page, limit, searchName });
    return { products, isEndPage };
  }

  @ApiOperation({ summary: '물품 조회', description: '검색하고자 하는 물품 product id 로 조회' })
  @ApiQuery({ type: Number, name: 'id', required: false, description: 'product id 입력' })
  @ApiOkResponse({ type: ProductFindOneRes, description: '구매 물품 조회 성공' })
  // ------------------------------------------------------------------------------------------
  @Get('product')
  async findOne(@Query('id', ParseIntPipe) id: Product['id']): Promise<ProductFindOneRes> {
    const product = await this.productService.findOne(id);

    return { product };
  }
}
