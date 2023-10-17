import { Controller, DefaultValuePipe, Get, Inject, ParseIntPipe, Query } from '@nestjs/common';
import { ProductFindAllRes, ProductFindOneRes } from './product.res.dto';
import { IProductService } from '../domain/product.service';
import { Product } from '../domain/product';

@Controller()
export class ProductController {
  constructor(@Inject('IProductService') private productService: IProductService) {}
  @Get('product/sale')
  async findAllForSale(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('searchName') searchName?: Product['name'],
  ): Promise<ProductFindAllRes> {
    const { products, isEndPage } = await this.productService.findAllForSale({ page, limit, searchName });
    return { products, isEndPage };
  }

  @Get('product')
  async findOne(@Query('id', ParseIntPipe) id: Product['id']): Promise<ProductFindOneRes> {
    const product = await this.productService.findOne(id);

    return { product };
  }
}
