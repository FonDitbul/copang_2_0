import axios from 'axios';
import * as cheerio from 'cheerio';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { createCupangCode } from './createCode';
import { CreateProduct, ProductRepository } from './product.repository';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ProductCrawlerService {
  constructor(
    @Inject('CategoryRepository') private categoryRepository: CategoryRepository,
    @Inject('ProductRepository') private productRepository: ProductRepository,
  ) {}

  @Cron('0 30 23 * * 5')
  async crawlerFromCupang() {
    const categoryList = await this.categoryRepository.findAll();
    // const categoryCupangIdList = categoryList.map((category) => category.code).map((code) => code.split('-')[1]);

    for (const category of categoryList) {
      const categoryCode = category.code.split('-')[1];
      for (let page = 1; page < 10; page++) {
        const products = await this.getProductsOfCategory(categoryCode, page);
        const createProducts = products.map((product) => {
          return {
            name: product.name,
            code: product.code,
            description: product.name,
            information: product.name,
            quantity: 0,
            cost: product.price,
            isSale: true,
            mainImage: product.imageSrc,
            sellerId: 1, // 임시 하드코딩
            categoryId: category.id,
          } as CreateProduct;
        });
        await this.productRepository.createMany(createProducts);
      }
    }
  }
  private async getProductsOfCategory(categoryId: string, page: number) {
    const url = `https://www.coupang.com/np/categories/${categoryId}?listSize=120&brand=&offerCondition=&filterType=&isPriceRange=false&minPrice=&maxPrice=&page=${page}&channel=user&fromComponent=N&selectedPlpKeepFilter=&sorter=bestAsc&filter=&rating=0`;

    const headers = {
      Host: 'www.coupang.com',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
    };

    const result = await axios.get(url, { headers: headers });

    const $ = cheerio.load(result.data);
    const productListServer = $('.baby-product-list').children('li');
    const productList = productListServer
      .map((num, product) => {
        const code = createCupangCode($(product).attr('id').trim());
        const name = $(product).children('a').children('dl').children('dd').children('div.name').text().trim();
        let priceString = $(product)
          .children('a')
          .children('dl')
          .children('dd')
          .children('div.price-area')
          .children('div.price-wrap')
          .children('div.price')
          .children('span.price-info')
          .children('.base-price')
          .text()
          .trim();
        if (!priceString) {
          priceString = $(product)
            .children('a')
            .children('dl')
            .children('dd')
            .children('div.price-area')
            .children('div.price-wrap')
            .children('div.price')
            .children('.sale')
            .children('.price-value')
            .text()
            .trim();
        }

        const price = +priceString.split(',').join('');

        const imageSrc = $(product).children('a').children('dl').children('dt').children('img').attr('src').trim();
        return {
          code,
          name,
          price,
          imageSrc,
        };
      })
      .toArray()
      .filter((product) => product.code && product.name && product.price && product.imageSrc)
      .filter((product) => product.name.length < 100);

    return productList;
  }
}
