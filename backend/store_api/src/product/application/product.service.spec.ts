import { ProductService } from './product.service';
import { mock, MockProxy } from 'jest-mock-extended';
import { IProductRepository } from '../domain/product.repository';
import { IProductFindAllIn } from '../domain/port/product.in';
import { Product } from '../domain/product';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';

describe('product service 테스트', () => {
  const productRepository: MockProxy<IProductRepository> = mock<IProductRepository>();
  const sut = new ProductService(productRepository);
  describe('findAllForSale 메소드 테스트', () => {
    describe('성공 케이스', () => {
      test('판매중인 product list를 성공적으로 반환한 경우', async () => {
        const givenFindAllIn: IProductFindAllIn = {
          limit: 10,
          page: 0,
          searchName: '',
        };

        const givenProduct: Product = {
          id: 12,
          name: '베가 워치',
          code: 'VEGA-2',
          description: '시계',
          information: '스마트 워치',
          quantity: 300000,
          cost: 850000,
          isSale: true,
          sellerId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          Seller: {
            id: 3,
            ceoName: '이모씨',
            companyName: '베가',
            address: '경기도 화성시 엘지역',
          },
        };
        productRepository.findAllForSale.mockResolvedValue([givenProduct]);
        productRepository.countForSale.mockResolvedValue(10);
        const result = await sut.findAllForSale({ ...givenFindAllIn });

        expect(result.products.length).toEqual(1);
        expect(result.products[0]).toEqual(givenProduct);
        expect(result.isEndPage).toEqual(false);
      });
      test('남은 판매 물품 page 가 limit 보다 적은 경우', async () => {
        const givenFindAllIn: IProductFindAllIn = {
          limit: 10,
          page: 0,
          searchName: '',
        };
        const givenProduct: Product = {
          id: 12,
          name: '베가 워치',
          code: 'VEGA-2',
          description: '시계',
          information: '스마트 워치',
          quantity: 300000,
          cost: 850000,
          isSale: true,
          sellerId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          Seller: {
            id: 3,
            ceoName: '이모씨',
            companyName: '베가',
            address: '경기도 화성시 엘지역',
          },
        };

        productRepository.findAllForSale.mockResolvedValue([givenProduct]);
        productRepository.countForSale.mockResolvedValue(7);
        const result = await sut.findAllForSale({ ...givenFindAllIn });

        expect(result.products.length).toEqual(1);
        expect(result.products[0]).toEqual(givenProduct);
        expect(result.isEndPage).toEqual(true);
      });

      test('남은 판매 물품 page 가 0인 경우', async () => {
        const givenFindAllIn: IProductFindAllIn = {
          limit: 10,
          page: 0,
          searchName: '',
        };
        const givenProduct: Product = {
          id: 12,
          name: '베가 워치',
          code: 'VEGA-2',
          description: '시계',
          information: '스마트 워치',
          quantity: 300000,
          cost: 850000,
          isSale: true,
          sellerId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          Seller: {
            id: 3,
            ceoName: '이모씨',
            companyName: '베가',
            address: '경기도 화성시 엘지역',
          },
        };

        productRepository.findAllForSale.mockResolvedValue([givenProduct]);
        productRepository.countForSale.mockResolvedValue(0);
        const result = await sut.findAllForSale({ ...givenFindAllIn });

        expect(result.products.length).toEqual(1);
        expect(result.products[0]).toEqual(givenProduct);
        expect(result.isEndPage).toEqual(true);
      });
    });
  });

  describe('findOne 메소드 테스트', () => {
    it('id를 받아서 product를 성공적으로 리턴한 경우', async () => {
      const givenId = 1;
      const givenProduct: Product = {
        id: 1,
        name: '베가 워치',
        code: 'VEGA-2',
        description: '시계',
        information: '스마트 워치',
        quantity: 300000,
        cost: 850000,
        isSale: true,
        sellerId: 3,
        createdAt: new Date(1694674805720),
        updatedAt: new Date(1694674805720),
        deletedAt: null,
      };
      productRepository.findOne.mockResolvedValue(givenProduct);

      const result = await sut.findOne(givenId);

      expect(result).toEqual({
        id: 1,
        name: '베가 워치',
        code: 'VEGA-2',
        description: '시계',
        information: '스마트 워치',
        quantity: 300000,
        cost: 850000,
        isSale: true,
        sellerId: 3,
        createdAt: new Date(1694674805720),
        updatedAt: new Date(1694674805720),
        deletedAt: null,
      });
    });

    it('id에 일치하는 product가 일치하지 않아 null을 반환하여 에러가 발생한 경우', async () => {
      const givenId = 1;
      productRepository.findOne.mockResolvedValue(null);

      await expect(async () => {
        await sut.findOne(givenId);
      }).rejects.toThrowError(new CoPangException(EXCEPTION_STATUS.PRODUCT_NOT_EXIST));
    });
  });
});
