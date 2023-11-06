import axios from 'axios';
import * as cheerio from 'cheerio';
import { OnModuleInit } from '@nestjs/common';

export class ProductCrawlerService implements OnModuleInit {
  onModuleInit() {
    this.crawlerFromCupang();
  }
  // TODO List Search를 다양하게 받는 방법은 어떻게 할지 ? ?
  // search를 꼭 해야하나? paging 은 어떻게 해아하나 ?

  // 숙제 데이터를 쌓는 방법 완
  // ProductCode를 활용하여 CUPANG-6497880831 요런식
  // productCode도 인덱스 필요 (중복제거 필)
  // productId는 search-product-link에 존재

  // 카테고리 create 기능도 필요할듯

  // 한 큰 카테고리 내에서 ex) 가전 디지털
  // first-depth 로만 하기 Category 테이블 만들기

  crawlerFromCupang() {
    const s = '모니터';
    const url = 'https://www.coupang.com/np/search?component=&q=' + encodeURI(s) + '&channel=user';

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

    axios
      .get(url, { headers: headers })
      .then((html) => {
        const $ = cheerio.load(html.data);
        const list = $('.search-product').map((i, elem) => {
          // console.log(i)

          const name = $(elem).find('.name').text();
          const src = $(elem).find('img.search-product-wrap-img').attr('src');
          // console.log(`name: ${name}, imageSrc: ${src}`)
          // $(element).find('td:nth-of-type(1)').text()
          // console.log(elem)
        });
        // const name = $('.search-product .name').text();
        // const price = $('.search-product .price-value').text();
        // const image = $('.search-product .search-product-wrap-img').attr('src');
        // const rating = $('.search-product .rating').text();
        // console.log(name);
        // console.log(price);
        // console.log(image)
        // console.log(rating);
      })
      .catch((e) => {
        console.log('errr!!', e);
      });
  }
}
