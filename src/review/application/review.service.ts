import { Inject, Injectable } from '@nestjs/common';
import { IReviewService } from '../domain/review.service';
import { IReviewRepository } from '../domain/reivew.repository';
import { ReviewCreateByBuyerIn, ReviewFindAllByProductIdIn } from '../domain/port/review.in';
import { Review } from '../domain/review';
import { IOrderProductRepository } from '../../order/domain/orderProduct.repository';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';

@Injectable()
export class ReviewService implements IReviewService {
  constructor(
    @Inject('IReviewRepository') private reviewRepository: IReviewRepository,
    @Inject('IOrderProductRepository') private orderProductRepository: IOrderProductRepository,
  ) {}

  async findAllByProductId(findAllByProductIdIn: ReviewFindAllByProductIdIn) {
    const result = await this.reviewRepository.findAllByProductId({ ...findAllByProductIdIn });
    return result;
  }

  async createByBuyer(createByBuyerIn: ReviewCreateByBuyerIn): Promise<Review> {
    const { buyerId, star, content, orderProductId } = createByBuyerIn;

    const orderProduct = await this.orderProductRepository.findOneById(orderProductId);
    if (!orderProduct) {
      throw new CoPangException(EXCEPTION_STATUS.ORDER_PRODUCT_NOT_EXIST);
    }

    if (orderProduct.buyerId !== buyerId) {
      throw new CoPangException(EXCEPTION_STATUS.ORDER_PRODUCT_NOT_MATCH_BUYER);
    }

    if (orderProduct.shippingStatus !== 'SHIPPING_COMPLETE') {
      throw new CoPangException(EXCEPTION_STATUS.ORDER_PRODUCT_NOT_SHIPPING_COMPLETE);
    }

    const review = await this.reviewRepository.createByBuyer({
      star,
      content,
      productId: orderProduct.productId,
      buyerId,
      orderProductId,
    });
    await this.orderProductRepository.updateByReview(orderProductId, review.id);

    return review;
  }
}
