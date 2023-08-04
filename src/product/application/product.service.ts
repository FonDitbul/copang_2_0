import { IProductService } from '../domain/product.service';
import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../domain/product.repository';
import { IProductFindAllIn } from '../domain/port/product.in';

@Injectable()
export class ProductService implements IProductService {
  constructor(@Inject('IProductRepository') private productRepository: IProductRepository) {}
  async findAllForSale(findAllIn: IProductFindAllIn) {
    const products = await this.productRepository.findAllForSale({ ...findAllIn });

    let isEndPage = true;
    if (products.length !== 0) {
      const lastProductId = products[products.length - 1].id;
      const productNextCount = await this.productRepository.countForSale({ ...findAllIn, lastProductId });
      isEndPage = productNextCount < findAllIn.limit ? true : false;
    }

    return { products, isEndPage };
  }
}
