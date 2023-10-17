import { formattingPhoneNumber, isNotMatchBuyerId } from './buyer';
import { BuyerAddress } from './buyerAddress';

describe('domain buyer.ts 테스트', () => {
  describe('phoneNumber 포메팅 함수 테스트', () => {
    test('하이픈 제거된 형태로 성공적으로 반환한 경우', () => {
      const result = formattingPhoneNumber('010-1234 5678');
      expect(result).toEqual(expect.not.stringContaining('-'));
    });

    test('띄어쓰기 제거된 형태로 성공적으로 반환한 경우', () => {
      const result = formattingPhoneNumber('010 1234 5678');
      expect(result).toEqual(expect.not.stringContaining(' '));
    });

    test('띄어쓰기와 하이픈이 혼합되어 성공적으로 제거된 경우 ', () => {
      const result = formattingPhoneNumber('010 1234-5678');
      expect(result).toEqual(expect.not.stringContaining(' '));
      expect(result).toEqual(expect.not.stringContaining('-'));
    });
  });

  describe('isNotMatchBuyerId 해당 buyer data 와 parameter buyerId가 일치하는 함수 테스트', () => {
    type BuyerAccountData = { buyerId: number };

    function FakeBuyerAccountData(): BuyerAccountData {
      return {
        buyerId: 1,
      };
    }
    it('givenBuyer 의 buyerId와 입력받은 buyerId가 같을 경우 ', () => {
      const givenBuyerData: BuyerAccountData = { ...FakeBuyerAccountData(), buyerId: 1 };
      const buyerId = 1;

      const result = isNotMatchBuyerId(givenBuyerData, buyerId);

      expect(result).toBeFalsy();
    });

    it('givenBuyer 의 buyerId와 입력받은 buyerId가 다를 경우 ', () => {
      const givenBuyerData: BuyerAccountData = { ...FakeBuyerAccountData(), buyerId: 1 };
      const buyerId = 2;

      const result = isNotMatchBuyerId(givenBuyerData, buyerId);

      expect(result).toBeTruthy();
    });

    it('givenBuyer 에 buyerId가 존재하지 않아 에러가 발생한 경우 ', () => {
      const givenBuyerData = {} as BuyerAccountData;
      const buyerId = 1;
      expect(() => isNotMatchBuyerId(givenBuyerData, buyerId)).toThrowError(new Error('buyerId가 존재하지 않습니다.'));
    });
  });
});
