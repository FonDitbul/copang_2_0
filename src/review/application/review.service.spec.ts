import { ReviewService } from './review.service';
import { IReviewService } from '../domain/review.service';
import { IReviewRepository } from '../domain/reivew.repository';
import { mock, mockClear, MockProxy } from 'jest-mock-extended';
import { ReviewFindAllByProductIdIn } from '../domain/port/review.in';
import { ReviewFindAllByProductIdOut } from '../domain/port/review.out';

describe('Buyer Service test  ', () => {
  const reviewRepository: MockProxy<IReviewRepository> = mock<IReviewRepository>();
  const sut: IReviewService = new ReviewService(reviewRepository); // System Under Test
  const reviewRepositoryFindAllSpyOn = jest.spyOn(reviewRepository, 'findAllByProductId');
  beforeEach(() => {
    mockClear(reviewRepositoryFindAllSpyOn);
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
});
