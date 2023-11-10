import { Cart } from '../../interface/Cart';
import { Product } from '../../interface/Product';
import { calculateCartCost, cartWithProduct } from './CartCost.Logic';

describe('Cart Cost Logic 테스트', function () {
  function FakeProduct(cost: number): Product {
    return {
      id: 1,
      name: 'name',
      code: 'PROD-1',
      description: '물품 테스트',
      information: '물품 테스트',
      quantity: 1,
      cost: cost,
      isSale: true,
      sellerId: 1,
      categoryId: 0,
      mainImage: 'mainImage',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
  function FakeCart(cost: number): Cart {
    return {
      id: 1,
      productQuantity: 1,
      status: 'ACTIVE',
      buyerId: 1,
      productId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      Product: FakeProduct(cost),
    };
  }

  describe('cartWithProduct 테스트', () => {
    it('cart object에서 product 가 반드시 존재하는 객체로 반환 성공한 경우', () => {
      const givenCart = FakeCart(100);

      const result = cartWithProduct(givenCart);

      expect(result.Product).toBeDefined();
    });
    it('cart object에서 Product가 존재하지 않아 error가 발생한 경우', () => {
      const givenCart: Cart = { ...FakeCart(100), Product: undefined };

      expect(() => cartWithProduct(givenCart)).toThrowError(new Error('no Product Information'));
    });
  });

  describe('calculateCartCost 테스트', () => {
    it('cart object 0개의 수량과 100,000 가격의 물품을 구매하고자 하는 경우 0 반환', () => {
      const givenCart = { ...FakeCart(100000), productQuantity: 0 };

      const result = calculateCartCost(givenCart);

      expect(result).toBe(0);
    });

    it('cart object 1개의 수량과 100,000 가격의 물품을 구매하고자 하는 경우 100,000 반환', () => {
      const givenCart = { ...FakeCart(100000), productQuantity: 1 };

      const result = calculateCartCost(givenCart);

      expect(result).toBe(100000);
    });

    it('cart object 3개의 수량과 50,000 가격의 물품을 구매하고자 하는 경우 150,000 반환', () => {
      const givenCart = { ...FakeCart(50000), productQuantity: 3 };

      const result = calculateCartCost(givenCart);

      expect(result).toBe(150000);
    });
  });
});
