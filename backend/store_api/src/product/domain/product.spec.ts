import { Product } from './product';

describe('Product 테스트', () => {
  describe('isDeleted static method 테스트', () => {
    test('이미 삭제된 product 인 경우', () => {
      const given: Product = {
        id: 1,
        name: '갤럭시북',
        code: 'ae340374-f0a4-4228-9978-a46221344593',
        description: '노트북',
        information: '노트북',
        quantity: 10000,
        cost: 1500000,
        isSale: true,
        sellerId: 1,
        categoryId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };

      const sut = Product.isDeleted(given);

      expect(sut).toBeTruthy();
    });

    test('삭제되지 않은 product 인 경우', () => {
      const given: Product = {
        id: 1,
        name: '갤럭시북',
        code: 'ae340374-f0a4-4228-9978-a46221344593',
        description: '노트북',
        information: '노트북',
        quantity: 10000,
        cost: 1500000,
        isSale: true,
        sellerId: 1,
        categoryId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const sut = Product.isDeleted(given);

      expect(sut).toBeFalsy();
    });
  });

  describe('isOverQuantity static method 테스트', () => {
    test('수량이 넘치지 않도록 주문한 경우', () => {
      const given: Product = {
        id: 1,
        name: '갤럭시북',
        code: 'ae340374-f0a4-4228-9978-a46221344593',
        description: '노트북',
        information: '노트북',
        quantity: 10000,
        cost: 1500000,
        isSale: true,
        sellerId: 1,
        categoryId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const sut = Product.isOverQuantity(given, 100);

      expect(sut).toBeFalsy();
    });

    test('수량이 넘치도록 주문한 경우', () => {
      const given: Product = {
        id: 1,
        name: '갤럭시북',
        code: 'ae340374-f0a4-4228-9978-a46221344593',
        description: '노트북',
        information: '노트북',
        quantity: 100,
        cost: 1500000,
        isSale: true,
        sellerId: 1,
        categoryId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const sut = Product.isOverQuantity(given, 200);

      expect(sut).toBeTruthy();
    });
  });
});
