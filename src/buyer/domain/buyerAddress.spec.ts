import { BuyerAddress, isNotMatchBuyerId } from './buyerAddress';

describe('bueyrAddress Domain 테스트', () => {
  describe('해당 buyerAddress와 parameter buyerId가 일치하는 함수 테스트', () => {
    function FakeBuyerAddress(): BuyerAddress {
      return {
        id: 1,
        buyerId: 1,
        address: '{"postalCode":"13561","addressRegion":"경기","addressLocality":"성남시 분당구","streetAddress":"정자일로 95","etc":"930호"}',
        isRepresentative: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: undefined,
      };
    }
    it('givenBuyer 의 buyerId와 입력받은 buyerId가 같을 경우 ', () => {
      const givenBuyerAddress: BuyerAddress = { ...FakeBuyerAddress(), buyerId: 1 };
      const buyerId = 1;

      const result = isNotMatchBuyerId(givenBuyerAddress, buyerId);

      expect(result).toBeFalsy();
    });

    it('givenBuyer 의 buyerId와 입력받은 buyerId가 다를 경우 ', () => {
      const givenBuyerAddress: BuyerAddress = { ...FakeBuyerAddress(), buyerId: 1 };
      const buyerId = 2;

      const result = isNotMatchBuyerId(givenBuyerAddress, buyerId);

      expect(result).toBeTruthy();
    });
  });
});
