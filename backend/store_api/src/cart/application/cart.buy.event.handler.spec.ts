import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { CartBuyEventHandler } from './cart.buy.event.handler';
import { ICartRepository } from '../domain/cart.repository';
import { CartBuyEvent } from '../domain/cart.buy.event';

describe('CartBuyEventHandler testing', () => {
  const cartRepository: MockProxy<ICartRepository> = mock<ICartRepository>();
  const sut = new CartBuyEventHandler(cartRepository);

  beforeEach(() => {
    mockReset(cartRepository);
  });

  describe('상품 구매 시 장바구니 테스트', () => {
    it('장바구니 삭제 성공', async () => {
      const givenCartBuyEvent: CartBuyEvent = {
        buyerId: 1,
        productIdArray: [1],
      };

      await sut.handle(new CartBuyEvent(givenCartBuyEvent.buyerId, givenCartBuyEvent.productIdArray));

      expect(cartRepository.deleteByBuy).toHaveBeenCalledWith(givenCartBuyEvent);
    });

    it('productId가 한개도 존재하지않아 호출하지 않을 경우 ', async () => {
      const givenCartBuyEvent: CartBuyEvent = {
        buyerId: 1,
        productIdArray: [],
      };

      await sut.handle(new CartBuyEvent(givenCartBuyEvent.buyerId, givenCartBuyEvent.productIdArray));

      expect(cartRepository.deleteByBuy).not.toHaveBeenCalled();
    });
  });
});
