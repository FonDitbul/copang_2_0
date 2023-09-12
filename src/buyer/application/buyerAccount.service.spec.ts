import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { IBuyerAddressRepository } from '../domain/buyerAddress.repository';
import { IBuyerAccountService } from '../domain/buyerAccount.service';
import { BuyerAccountService } from './buyerAccount.service';
import { BuyerCreateAddressOut } from '../domain/port/buyerAddress.out';
import { BuyerCreateAddressIn } from '../domain/port/buyerAddress.in';

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

  describe('구매자의 address 생성 테스트', () => {
    it('구매자의 id와 전달받은 address 를 string 으로 변환하여 레코드 생성에 성공한 경우', async () => {
      const givenBuyerId = 1;
      const givenAddress = {
        postalCode: '13561',
        addressRegion: '경기',
        addressLocality: '성남시 분당구',
        streetAddress: '정자일로 95',
      };
      const createAddressIn: BuyerCreateAddressIn = {
        buyerId: 1,
        address: givenAddress,
      };

      const result = await sut.createAddress(createAddressIn);

      expect(buyerAddressRepository.createAddress).toHaveBeenCalledWith({
        buyerId: 1,
        address: '{"postalCode":"13561","addressRegion":"경기","addressLocality":"성남시 분당구","streetAddress":"정자일로 95"}',
      });
    });
  });
});
