import axios from 'axios';
import * as cheerio from 'cheerio';
import { Inject, Injectable, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { CategoryRepository, CreateCategory } from './category.repository';
import { createCupangCode } from './createCode';

@Injectable()
export class CategoryCrawlerService implements OnApplicationBootstrap {
  constructor(@Inject('CategoryRepository') private categoryRepository: CategoryRepository) {}

  onApplicationBootstrap() {
    this.getByCupang();
  }

  /***
   * cupang 에서 카테고리 crawler 1회만 실행
   ***/
  async getByCupang() {
    const url = 'https://www.coupang.com/';

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

    try {
      const result = await axios.get(url, { headers: headers });
      const $ = cheerio.load(result.data);

      const menuList = $('.shopping-menu-list').children('li');

      const categoryList: CreateCategory[] = menuList
        .toArray()
        .filter((i) => {
          const node = i.firstChild as unknown as Element;

          return node.attributes[2];
        })
        .map((elem) => {
          const node = elem.firstChild as unknown as Element;

          // node.attributes data
          // [0] = Object {name: "href", value: "/np/categories/305798", namespace: undefined, prefix: undefined}
          // [1] = Object {name: "class", value: "first-depth", namespace: undefined, prefix: undefined}
          // [2] = Object {name: "data-log-props", value: "{ "id":"category_menu", "param":{"categoryLabel":"health"} }"}

          const getCategoryHref = node.attributes[0];
          const categoryId = getCategoryHref.value.trim().split('/')[3];

          const getCategoryDataLog = node.attributes[2];
          const categoryDataValueObj = JSON.parse(getCategoryDataLog.value) as { id: string; param: { categoryLabel: string } };
          const categoryName = categoryDataValueObj.param.categoryLabel;

          return {
            code: createCupangCode(categoryId),
            name: categoryName,
          };
        });

      await this.categoryRepository.createMany(categoryList);
    } catch (e) {
      throw new Error(e);
    }
  }
}
