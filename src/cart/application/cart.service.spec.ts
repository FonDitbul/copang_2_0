import { CartService } from './cart.service';
import { ICartRepository } from '../domain/cart.repository';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { ICartFindAllIn } from '../domain/port/cart.in';

describe('cart Service test', () => {
  const cartRepository: MockProxy<ICartRepository> = mock<ICartRepository>();
  const sut = new CartService(cartRepository);

  beforeEach(() => {
    mockReset(cartRepository);
  });

  describe('findAll test', () => {
    test('구매자가 장바구니를 조회하여 마지막 페이지가 아닌 장바구니가 리턴된 경우', async () => {
      const givenFindAllIn: ICartFindAllIn = {
        buyerId: 1,
        limit: 50,
        lastId: 0,
      };

      cartRepository.findAllByBuyerId.mockResolvedValue([
        {
          id: 1,
          productQuantity: 1,
          status: 'ACTIVE',
          buyerId: 1,
          productId: 1,
          createdAt: new Date('2023-08-09T15:38:17.321'),
          updatedAt: new Date('2023-08-09T15:38:17.321'),
          deletedAt: null,
          Product: {
            id: 1,
            name: '갤럭시 북',
            code: 'SOMSONG-1',
            description: '노트북',
            information: '가볍고 좋은노트북',
            quantity: 20000,
            cost: 1150000,
            isSale: true,
            sellerId: 1,
            createdAt: new Date('2023-08-09T15:38:17.321'),
            updatedAt: new Date('2023-08-09T15:38:17.321'),
            deletedAt: null,
            Seller: {
              id: 1,
              ceoName: '이모씨',
              companyName: '솜송',
              address: '경기도 화성시 삼성역',
            },
          },
        },
      ]);
      cartRepository.countByBuyerId.mockResolvedValue(100);

      const result = await sut.findAll(givenFindAllIn);

      expect(result.isEndPage).toEqual(false);
      expect(result.carts.length).toEqual(1);
      expect(result.carts).toEqual([
        {
          id: 1,
          productQuantity: 1,
          status: 'ACTIVE',
          buyerId: 1,
          productId: 1,
          createdAt: new Date('2023-08-09T15:38:17.321'),
          updatedAt: new Date('2023-08-09T15:38:17.321'),
          deletedAt: null,
          Product: {
            id: 1,
            name: '갤럭시 북',
            code: 'SOMSONG-1',
            description: '노트북',
            information: '가볍고 좋은노트북',
            quantity: 20000,
            cost: 1150000,
            isSale: true,
            sellerId: 1,
            createdAt: new Date('2023-08-09T15:38:17.321'),
            updatedAt: new Date('2023-08-09T15:38:17.321'),
            deletedAt: null,
            Seller: {
              id: 1,
              ceoName: '이모씨',
              companyName: '솜송',
              address: '경기도 화성시 삼성역',
            },
          },
        },
      ]);
    });

    test('구매자가 장바구니를 조회하여 마지막 페이지가 리턴된 경우', async () => {
      const givenFindAllIn: ICartFindAllIn = {
        buyerId: 1,
        limit: 50,
        lastId: 0,
      };

      cartRepository.findAllByBuyerId.mockResolvedValue([
        {
          id: 1,
          productQuantity: 1,
          status: 'ACTIVE',
          buyerId: 1,
          productId: 1,
          createdAt: new Date('2023-08-09T15:38:17.321'),
          updatedAt: new Date('2023-08-09T15:38:17.321'),
          deletedAt: null,
          Product: {
            id: 1,
            name: '갤럭시 북',
            code: 'SOMSONG-1',
            description: '노트북',
            information: '가볍고 좋은노트북',
            quantity: 20000,
            cost: 1150000,
            isSale: true,
            sellerId: 1,
            createdAt: new Date('2023-08-09T15:38:17.321'),
            updatedAt: new Date('2023-08-09T15:38:17.321'),
            deletedAt: null,
            Seller: {
              id: 1,
              ceoName: '이모씨',
              companyName: '솜송',
              address: '경기도 화성시 삼성역',
            },
          },
        },
      ]);
      cartRepository.countByBuyerId.mockResolvedValue(40);

      const result = await sut.findAll(givenFindAllIn);

      expect(result.isEndPage).toEqual(true);
      expect(result.carts.length).toEqual(1);
      expect(result.carts).toEqual([
        {
          id: 1,
          productQuantity: 1,
          status: 'ACTIVE',
          buyerId: 1,
          productId: 1,
          createdAt: new Date('2023-08-09T15:38:17.321'),
          updatedAt: new Date('2023-08-09T15:38:17.321'),
          deletedAt: null,
          Product: {
            id: 1,
            name: '갤럭시 북',
            code: 'SOMSONG-1',
            description: '노트북',
            information: '가볍고 좋은노트북',
            quantity: 20000,
            cost: 1150000,
            isSale: true,
            sellerId: 1,
            createdAt: new Date('2023-08-09T15:38:17.321'),
            updatedAt: new Date('2023-08-09T15:38:17.321'),
            deletedAt: null,
            Seller: {
              id: 1,
              ceoName: '이모씨',
              companyName: '솜송',
              address: '경기도 화성시 삼성역',
            },
          },
        },
      ]);
    });
  });
});
