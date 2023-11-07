import { CartService } from './cart.service';
import { ICartRepository } from '../domain/cart.repository';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { ICartAddIn, ICartChangeIn, ICartDeleteIn, ICartFindAllIn } from '../domain/port/cart.in';
import { IProductRepository } from '../../product/domain/product.repository';
import { Product } from '../../product/domain/product';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';
import { Cart } from '../domain/cart';

describe('cart Service test', () => {
  const cartRepository: MockProxy<ICartRepository> = mock<ICartRepository>();
  const productRepository: MockProxy<IProductRepository> = mock<IProductRepository>();
  const sut = new CartService(cartRepository, productRepository);

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

  describe('add test', () => {
    describe('성공 케이스', () => {
      test('장바구니에 추가하고자 하는 구매자 id와 productId, quantity 를 받아 장바구니 추가에 성공한 경우', async () => {
        const givenAddIn: ICartAddIn = {
          buyerId: 1,
          productId: 1,
          productQuantity: 1,
        };
        const givenProduct: Product = {
          id: 1,
          name: '갤럭시북',
          code: 'GALAXY-001',
          description: '노트북',
          information: '노트북',
          quantity: 1,
          cost: 1_000_000,
          isSale: true,
          sellerId: 1,
          categoryId: 1,
          mainImage: '',
          createdAt: new Date('2023-08-04T11:33:14.168'),
          updatedAt: new Date('2023-08-04T11:33:14.168'),
          deletedAt: null,
        };
        productRepository.findOne.mockResolvedValue(givenProduct);

        const result = await sut.add(givenAddIn);

        expect(cartRepository.add).toBeCalledWith(givenAddIn);
      });
    });
    describe('실패 케이스', () => {
      test('장바구니에 추가하고자 product 가 삭제되어 추가에 실패한 경우', async () => {
        const givenAddIn: ICartAddIn = {
          buyerId: 1,
          productId: 1,
          productQuantity: 1,
        };
        const givenProduct: Product = {
          id: 1,
          name: '갤럭시북',
          code: 'GALAXY-001',
          description: '노트북',
          information: '노트북',
          quantity: 1,
          cost: 1_000_000,
          isSale: true,
          sellerId: 1,
          categoryId: 1,
          mainImage: '',
          createdAt: new Date('2023-08-04T11:33:14.168'),
          updatedAt: new Date('2023-08-04T11:33:14.168'),
          deletedAt: new Date(),
        };
        productRepository.findOne.mockResolvedValue(givenProduct);

        await expect(async () => sut.add(givenAddIn)).rejects.toThrowError(new CoPangException(EXCEPTION_STATUS.PRODUCT_NOT_EXIST));
      });

      test('장바구니에 이미 존재하여 추가에 실패한 경우', async () => {
        const givenAddIn: ICartAddIn = {
          buyerId: 1,
          productId: 1,
          productQuantity: 1,
        };
        const givenProduct: Product = {
          id: 1,
          name: '갤럭시북',
          code: 'GALAXY-001',
          description: '노트북',
          information: '노트북',
          quantity: 1,
          cost: 1_000_000,
          isSale: true,
          sellerId: 1,
          categoryId: 1,
          mainImage: '',
          createdAt: new Date('2023-08-04T11:33:14.168'),
          updatedAt: new Date('2023-08-04T11:33:14.168'),
          deletedAt: null,
        };
        const givenCart: Cart = {
          id: 1,
          buyerId: 1,
          productId: 1,
          productQuantity: 1,
          status: 'ACTIVE',
          createdAt: new Date('2023-08-04T11:33:14.168'),
          updatedAt: new Date('2023-08-04T11:33:14.168'),
          deletedAt: null,
        };
        productRepository.findOne.mockResolvedValue(givenProduct);
        cartRepository.findOne.mockResolvedValue(givenCart);

        await expect(async () => sut.add(givenAddIn)).rejects.toThrowError(new CoPangException(EXCEPTION_STATUS.CART_EXIST));
      });
    });
  });

  describe('change test', () => {
    describe('성공 케이스', () => {
      test('변경하고자 하는 장바구니 id를 받아 변경에 성공한 경우', async () => {
        const givenChangeIn: ICartChangeIn = {
          buyerId: 1,
          id: 1,
          productQuantity: 1,
          status: 'ACTIVE',
        };
        const givenCart: Cart = {
          id: 1,
          productId: 1,
          productQuantity: 1,
          buyerId: 1,
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };

        cartRepository.findOne.mockResolvedValue(givenCart);

        const result = await sut.change(givenChangeIn);

        expect(cartRepository.change).toBeCalledWith({
          id: givenChangeIn.id,
          productQuantity: givenChangeIn.productQuantity,
          status: givenChangeIn.status,
        });
      });
    });

    describe('실패 케이스', () => {
      test('변경하고자 하는 장바구니 id가 존재하지 않아 실패한 경우', async () => {
        const givenChangeIn: ICartChangeIn = {
          buyerId: 1,
          id: 1,
          productQuantity: 1,
          status: 'ACTIVE',
        };

        cartRepository.findOne.mockResolvedValue(null);

        await expect(() => sut.change(givenChangeIn)).rejects.toThrowError(new CoPangException(EXCEPTION_STATUS.CART_NOT_EXIST));
      });

      test('변경하고자 하는 장바구니가 삭제되어 실패한 경우', async () => {
        const givenChangeIn: ICartChangeIn = {
          buyerId: 1,
          id: 1,
          productQuantity: 1,
          status: 'ACTIVE',
        };

        const givenCart: Cart = {
          id: 1,
          productId: 1,
          productQuantity: 1,
          buyerId: 1,
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date(),
        };
        cartRepository.findOne.mockResolvedValue(givenCart);

        await expect(() => sut.change(givenChangeIn)).rejects.toThrowError(new CoPangException(EXCEPTION_STATUS.CART_DELETED));
      });

      test('변경하고자 하는 장바구니의 buyerId 와 입력받은 buyerId가 달라 실패한 경우', async () => {
        const givenChangeIn: ICartChangeIn = {
          buyerId: 1,
          id: 1,
          productQuantity: 1,
          status: 'ACTIVE',
        };

        const givenCart: Cart = {
          id: 1,
          productId: 1,
          productQuantity: 1,
          buyerId: 2,
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };
        cartRepository.findOne.mockResolvedValue(givenCart);

        await expect(() => sut.change(givenChangeIn)).rejects.toThrowError(new CoPangException(EXCEPTION_STATUS.CART_BUYER_ID_DIFFERENT));
      });
    });
  });

  describe('delete test', () => {
    describe('성공 케이스', () => {
      test('삭제하고자 하는 장바구니 id를 받아 삭제에 성공한 경우', async () => {
        const givenDeleteIn: ICartDeleteIn = {
          buyerId: 1,
          id: 1,
        };
        const givenCart: Cart = {
          id: 1,
          productId: 1,
          productQuantity: 1,
          buyerId: 1,
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };

        cartRepository.findOne.mockResolvedValue(givenCart);

        const result = await sut.delete(givenDeleteIn);

        expect(cartRepository.delete).toBeCalledWith({
          id: givenDeleteIn.id,
        });
      });
    });

    describe('실패 케이스', () => {
      test('삭제하고자 하는 장바구니 id가 존재하지 않아 실패한 경우', async () => {
        const givenDeleteIn: ICartDeleteIn = {
          buyerId: 1,
          id: 1,
        };

        cartRepository.findOne.mockResolvedValue(null);

        await expect(() => sut.delete(givenDeleteIn)).rejects.toThrowError(new CoPangException(EXCEPTION_STATUS.CART_NOT_EXIST));
      });

      test('삭제하고자 하는 장바구니가 이미 삭제되어 실패한 경우', async () => {
        const givenDeleteIn: ICartDeleteIn = {
          buyerId: 1,
          id: 1,
        };

        const givenCart: Cart = {
          id: 1,
          productId: 1,
          productQuantity: 1,
          buyerId: 1,
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date(),
        };
        cartRepository.findOne.mockResolvedValue(givenCart);

        await expect(() => sut.delete(givenDeleteIn)).rejects.toThrowError(new CoPangException(EXCEPTION_STATUS.CART_DELETED));
      });

      test('삭제하고자 하는 장바구니의 buyerId 와 입력받은 buyerId가 달라 실패한 경우', async () => {
        const givenDeleteIn: ICartDeleteIn = {
          buyerId: 1,
          id: 1,
        };

        const givenCart: Cart = {
          id: 1,
          productId: 1,
          productQuantity: 1,
          buyerId: 2,
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };
        cartRepository.findOne.mockResolvedValue(givenCart);

        await expect(() => sut.delete(givenDeleteIn)).rejects.toThrowError(new CoPangException(EXCEPTION_STATUS.CART_BUYER_ID_DIFFERENT));
      });
    });
  });
});
