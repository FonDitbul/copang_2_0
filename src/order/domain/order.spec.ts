import { createOrderName, sumTotalCost } from './order';
import { MergeOrderProduct } from './orderBuyProduct';

describe('order 테스트', () => {
  describe('createOrder Name 테스트', () => {
    test('판매 물품 0개 일 시 에러 반환', () => {
      const given = [];

      expect(() => createOrderName(given)).toThrowError(new Error('0개의 배열은 만들 수 없습니다.'));
    });

    test('판매 물품 2개 일 시 외 1건 반환', () => {
      const given = ['물건 1', '물건 2'];

      const sut = createOrderName(given);

      expect(sut).toBe('물건 1 외 1건');
    });

    test('판매 물품 3개 일 시 외 2건 반환', () => {
      const given = ['물건 1', '물건 2', '물건 3'];

      const sut = createOrderName(given);

      expect(sut).toBe('물건 1 외 2건');
    });
  });

  describe('mergeOrderProduct 테스트', () => {
    test('DB상에 존재하는 productArray 와 구매하고자 하는 product Map을 통해 mergeOrderProductMap 생성에 성공한 경우', () => {});
  });

  describe('sumTotalCost 테스트', () => {
    test('현재 0, 가격이 10000, 구매 수량이 1인경우', () => {
      const givenProduct: MergeOrderProduct = {
        buyQuantity: 1,
        cost: 10000,
        code: 'test',
        createdAt: new Date(),
        deletedAt: new Date(),
        description: 'test',
        id: 0,
        information: 'test',
        isSale: true,
        name: 'test',
        quantity: 0,
        sellerId: 0,
        updatedAt: undefined,
      };

      const sut = sumTotalCost(0, givenProduct);

      expect(sut).toBe(10000);
    });

    test('현재 20000, 가격이 10000, 구매 수량이 3인경우', () => {
      const givenProduct: MergeOrderProduct = {
        buyQuantity: 3,
        cost: 10000,
        code: 'test',
        createdAt: new Date(),
        deletedAt: new Date(),
        description: 'test',
        id: 0,
        information: 'test',
        isSale: true,
        name: 'test',
        quantity: 0,
        sellerId: 0,
        updatedAt: undefined,
      };

      const sut = sumTotalCost(20000, givenProduct);

      expect(sut).toBe(50000);
    });
  });
});
