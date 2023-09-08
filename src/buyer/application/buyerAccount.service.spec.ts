import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { IBuyerAddressRepository } from '../domain/buyerAddress.repository';
import { IBuyerAccountService } from '../domain/buyerAccount.service';
import { BuyerAccountService } from './buyerAccount.service';

describe('Buyer Account Service Test', () => {
  const buyerAddressRepository: MockProxy<IBuyerAddressRepository> = mock<IBuyerAddressRepository>();

  const sut: IBuyerAccountService = new BuyerAccountService(buyerAddressRepository);

  beforeEach(() => {
    mockReset(buyerAddressRepository);
  });
  describe('구매자의 address 조회 테스트', () => {
    it('구매자의 id를 통해서 address 를 성공적으로 조회한 경우', async () => {
      const givenBuyerId = 1;

      const result = await sut.getAddressArray(givenBuyerId);

      expect(buyerAddressRepository.getAllAddressByBuyerId).toHaveBeenCalledWith(givenBuyerId);
    });
  });
});
