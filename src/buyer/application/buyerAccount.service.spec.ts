import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { IBuyerAddressRepository } from '../domain/buyerAddress.repository';
import { IBuyerAccountService } from '../domain/buyerAccount.service';
import { BuyerAccountService } from './buyerAccount.service';
import { BuyerCreateAddressOut } from '../domain/port/buyerAddress.out';
import { BuyerCreateAddressIn, BuyerDeleteIn, BuyerUpdateRepresentativeIn } from '../domain/port/buyerAddress.in';
import { BuyerAddress } from '../domain/buyerAddress';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';
import { BuyerCard } from '../domain/buyerCard';
import { IBuyerCardRepository } from '../domain/buyerCard.repository';

describe('Buyer Account Service Test', () => {
  const buyerAddressRepository: MockProxy<IBuyerAddressRepository> = mock<IBuyerAddressRepository>();
  const buyerCardRepository: MockProxy<IBuyerCardRepository> = mock<IBuyerCardRepository>();

  const sut: IBuyerAccountService = new BuyerAccountService(buyerAddressRepository, buyerCardRepository);

  beforeEach(() => {
    mockReset(buyerAddressRepository);
    mockReset(buyerCardRepository);
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
      const givenCreateAddressIn: BuyerCreateAddressIn = {
        buyerId: 1,
        address: givenAddress,
      };

      const result = await sut.createAddress(givenCreateAddressIn);

      expect(buyerAddressRepository.createAddress).toHaveBeenCalledWith({
        buyerId: 1,
        address: '{"postalCode":"13561","addressRegion":"경기","addressLocality":"성남시 분당구","streetAddress":"정자일로 95"}',
      });
    });
  });

  describe('구매자의 대표 주소 업데이트 설정 테스트', () => {
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
    it('buyerId와 buyerAddress id를 통해 대표 주소 설정에 성공한 경우 ', async () => {
      const givenUpdateIn: BuyerUpdateRepresentativeIn = {
        buyerId: 1,
        id: 1,
      };
      buyerAddressRepository.getOneById.mockResolvedValue({
        ...FakeBuyerAddress(),
        buyerId: 1,
        id: 1,
      });

      const result = await sut.updateRepresentativeAddress(givenUpdateIn);

      expect(buyerAddressRepository.updatesIsNotRepresentativeAddressByBuyerId).toHaveBeenCalledWith(1);
      expect(buyerAddressRepository.updateIsRepresentativeAddressById).toHaveBeenCalledWith(1);
    });

    it('buyerId와 buyerAddress id가 일치하지 않아 에러가 발생한 경우', async () => {
      const givenUpdateIn: BuyerUpdateRepresentativeIn = {
        buyerId: 1,
        id: 1,
      };
      buyerAddressRepository.getOneById.mockResolvedValue({
        ...FakeBuyerAddress(),
        buyerId: 3,
        id: 1,
      });

      await expect(async () => {
        await sut.updateRepresentativeAddress(givenUpdateIn);
      }).rejects.toThrowError(new CoPangException(EXCEPTION_STATUS.USER_ID_NOT_MATCH));

      expect(buyerAddressRepository.updatesIsNotRepresentativeAddressByBuyerId).not.toHaveBeenCalled();
      expect(buyerAddressRepository.updateIsRepresentativeAddressById).not.toHaveBeenCalled();
    });
  });

  describe('구매자의 주소 삭제 테스트', () => {
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
    it('buyerId와 buyerAddress id를 통해 삭제에 성공한 경우 ', async () => {
      const givenDeleteIn: BuyerDeleteIn = {
        buyerId: 1,
        id: 1,
      };
      buyerAddressRepository.getOneById.mockResolvedValue({
        ...FakeBuyerAddress(),
        buyerId: 1,
        id: 1,
      });

      const result = await sut.deleteAddress(givenDeleteIn);

      expect(buyerAddressRepository.deleteAddressById).toHaveBeenCalledWith(1);
    });

    it('buyerId와 buyerAddress id가 일치하지 않아 에러가 발생한 경우', async () => {
      const givenDeleteIn: BuyerDeleteIn = {
        buyerId: 1,
        id: 1,
      };
      buyerAddressRepository.getOneById.mockResolvedValue({
        ...FakeBuyerAddress(),
        buyerId: 2,
        id: 1,
      });

      await expect(async () => {
        await sut.updateRepresentativeAddress(givenDeleteIn);
      }).rejects.toThrowError(new CoPangException(EXCEPTION_STATUS.USER_ID_NOT_MATCH));

      expect(buyerAddressRepository.deleteAddressById).not.toHaveBeenCalled();
    });
  });

  function FakeBuyerCard(): BuyerCard {
    return {
      id: 1,
      buyerId: 1,
      bankName: '코팡 은행',
      cardNumber: '0000-0000-0000-0000',
      cardType: '체크카드',
      validityPeriod: '2025/05',
      isRepresentative: false,
      createdAt: new Date(1694674805720),
      updatedAt: new Date(1694674805720),
      deletedAt: undefined,
    };
  }
  describe('구매자의 카드 불러오기 테스트', () => {
    it('buyerId를 통해 구매자 카드 리스트를 성공적으로 번환한 경우 ', async () => {
      const givenBuyerId = 1;
      const givenBuyerCard = [FakeBuyerCard()];
      buyerCardRepository.getAllByBuyerId.mockResolvedValue(givenBuyerCard);

      const result = await sut.getCardArray(givenBuyerId);

      expect(buyerCardRepository.getAllByBuyerId).toHaveBeenCalledWith(1);
      expect(result[0]).toEqual({
        id: 1,
        buyerId: 1,
        bankName: '코팡 은행',
        cardNumber: '0000-0000-0000-0000',
        cardType: '체크카드',
        validityPeriod: '2025/05',
        isRepresentative: false,
        createdAt: new Date(1694674805720),
        updatedAt: new Date(1694674805720),
        deletedAt: undefined,
      });
    });
  });
});
