import { ReviewService } from './review.service';
import { IReviewService } from '../domain/review.service';
import { IReviewRepository } from '../domain/reivew.repository';
import { mock, mockClear, MockProxy } from 'jest-mock-extended';
import { ReviewCreateByBuyerIn, ReviewFindAllByProductIdIn } from '../domain/port/review.in';
import { ReviewFindAllByProductIdOut } from '../domain/port/review.out';
import { IOrderProductRepository } from '../../order/domain/orderProduct.repository';
import { Review } from '../domain/review';
import { OrderProduct } from '../../order/domain/orderProduct';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';

describe('Buyer Service test  ', () => {
  const reviewRepository: MockProxy<IReviewRepository> = mock<IReviewRepository>();
  const orderProductRepository: MockProxy<IOrderProductRepository> = mock<IOrderProductRepository>();
  const sut: IReviewService = new ReviewService(reviewRepository, orderProductRepository); // System Under Test

  const reviewRepositoryFindAllSpyOn = jest.spyOn(reviewRepository, 'findAllByProductId');

  beforeEach(() => {
    mockClear(reviewRepositoryFindAllSpyOn);
    mockClear(orderProductRepository);
  });

  describe('findAllByProductId 테스트', () => {
    describe('성공 케이스', () => {
      test('repository 로 부터 데이터를 받아온 경우', async () => {
        const findAllByProductIdIn: ReviewFindAllByProductIdIn = {
          productId: 1,
          lastReviewId: 0,
          limit: 10,
          sort: 'ASC',
          sortColumn: 'id',
        };
        const findAllByProductIdOut: ReviewFindAllByProductIdOut = {
          productId: 1,
          lastReviewId: 0,
          limit: 10,
          sort: 'ASC',
          sortColumn: 'id',
        };
        const createdAt = new Date();
        const updatedAt = new Date();

        reviewRepositoryFindAllSpyOn.mockResolvedValue([
          {
            id: 1,
            star: 3,
            content: '테스트 리뷰',
            productId: 1,
            buyerId: 1,
            orderProductId: null,
            createdAt,
            updatedAt,
            deletedAt: null,
          },
        ]);

        const result = await sut.findAllByProductId(findAllByProductIdIn);

        expect(reviewRepositoryFindAllSpyOn).toBeCalledWith(findAllByProductIdOut);
        expect(result).toEqual([
          {
            id: 1,
            star: 3,
            content: '테스트 리뷰',
            productId: 1,
            buyerId: 1,
            orderProductId: null,
            createdAt,
            updatedAt,
            deletedAt: null,
          },
        ]);
      });
    });
  });

  describe('createByBuyer 구매자에 의한 리뷰 작성 테스트', () => {
    describe('성공 케이스', () => {
      it('buyer 정보와 구매한 물품 정보를 통해 review 작성이 성공한 경우', async () => {
        const createByBuyerIn: ReviewCreateByBuyerIn = {
          buyerId: 1,
          content: '리뷰 작성',
          orderProductId: 1,
          star: 1,
        };
        const givenReview: Review = {
          id: 1,
          buyerId: 1,
          content: '리뷰 작성',
          orderProductId: 1,
          productId: 1,
          star: 5,
          updatedAt: new Date(),
          createdAt: new Date(),
          deletedAt: null,
        };
        const givenOrderProduct: OrderProduct = {
          id: 1,
          buyQuantity: 1,
          buyerId: 1,
          orderId: 1,
          productId: 1,
          reviewId: 1,
          sellerId: 1,
          address: '주소',
          code: 'TEST-001',
          cost: 100,
          description: 'TEST',
          information: 'TEST',
          name: 'TEST',
          shippingStatus: 'SHIPPING_COMPLETE',
          updatedAt: undefined,
          createdAt: undefined,
          deletedAt: undefined,
        };

        orderProductRepository.findOneById.mockResolvedValue(givenOrderProduct);
        reviewRepository.createByBuyer.mockResolvedValue(givenReview);

        const result = await sut.createByBuyer(createByBuyerIn);

        expect(orderProductRepository.updateByReview).toHaveBeenCalledWith(createByBuyerIn.orderProductId, givenReview.id);
        expect(orderProductRepository.findOneById).toHaveBeenCalledWith(createByBuyerIn.orderProductId);
        expect(result).toEqual(givenReview);
      });
    });
    describe('실패 케이스', () => {
      it('해당 orderProductId가 DB 상에 존재하지 않을 경우 Error', async () => {
        const createByBuyerIn: ReviewCreateByBuyerIn = {
          buyerId: 1,
          content: '리뷰 작성',
          orderProductId: 1,
          star: 1,
        };

        orderProductRepository.findOneById.mockResolvedValue(null);

        await expect(async () => {
          await sut.createByBuyer(createByBuyerIn);
        }).rejects.toThrowError(new CoPangException(EXCEPTION_STATUS.ORDER_PRODUCT_NOT_EXIST));
      });

      it('주문 물품의 buyer와 입력받은 buyer 가 다를 경우 ', async () => {
        const createByBuyerIn: ReviewCreateByBuyerIn = {
          buyerId: 2,
          content: '리뷰 작성',
          orderProductId: 1,
          star: 1,
        };
        const givenOrderProduct: OrderProduct = {
          id: 1,
          buyQuantity: 1,
          buyerId: 1, // other buyer
          orderId: 1,
          productId: 1,
          reviewId: 1,
          sellerId: 1,
          address: '주소',
          code: 'TEST-001',
          cost: 100,
          description: 'TEST',
          information: 'TEST',
          name: 'TEST',
          shippingStatus: 'SHIPPING_COMPLETE',
          updatedAt: undefined,
          createdAt: undefined,
          deletedAt: undefined,
        };

        orderProductRepository.findOneById.mockResolvedValue(givenOrderProduct);

        await expect(async () => {
          await sut.createByBuyer(createByBuyerIn);
        }).rejects.toThrowError(new CoPangException(EXCEPTION_STATUS.ORDER_PRODUCT_NOT_MATCH_BUYER));
      });

      it('주문 물품의 배송이 완료되지 않은 경우 Review 를 작성할 수 없어야 한다.', async () => {
        const createByBuyerIn: ReviewCreateByBuyerIn = {
          buyerId: 1,
          content: '리뷰 작성',
          orderProductId: 1,
          star: 1,
        };
        const givenOrderProduct: OrderProduct = {
          id: 1,
          buyQuantity: 1,
          buyerId: 1, // other buyer
          orderId: 1,
          productId: 1,
          reviewId: 1,
          sellerId: 1,
          address: '주소',
          code: 'TEST-001',
          cost: 100,
          description: 'TEST',
          information: 'TEST',
          name: 'TEST',
          shippingStatus: 'SHIPPING_READY',
          updatedAt: undefined,
          createdAt: undefined,
          deletedAt: undefined,
        };

        orderProductRepository.findOneById.mockResolvedValue(givenOrderProduct);

        await expect(async () => {
          await sut.createByBuyer(createByBuyerIn);
        }).rejects.toThrowError(new CoPangException(EXCEPTION_STATUS.ORDER_PRODUCT_NOT_SHIPPING_COMPLETE));
      });
    });
  });
});
