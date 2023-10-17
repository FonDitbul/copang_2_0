import React, { useEffect, useState } from 'react';
import { Review } from '../../interface/Review';
import { stringToDate } from '@libs/utils';
import { ServerReview } from './ReviewProduct.Organ';
import { format } from 'date-fns';
import ReviewRatingMole from './ReviewRating.Mole';

export default function ReviewCardMole(reviewProps: ServerReview) {
  const [review, setReview] = useState({
    id: 0,
    star: 0,
    content: 'test',
    productId: 0,
    buyerId: 0,
    orderProductId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),

    Buyer: undefined,
  } as Review);

  useEffect(() => {
    if (!reviewProps.Buyer) {
      throw new Error('buyer is not exist');
    }

    setReview({
      id: reviewProps.id,
      star: reviewProps.star,
      content: reviewProps.content,
      productId: reviewProps.productId,
      buyerId: reviewProps.buyerId,
      orderProductId: reviewProps.orderProductId,
      createdAt: stringToDate(reviewProps.createdAt),
      updatedAt: stringToDate(reviewProps.updatedAt),

      Buyer: reviewProps.Buyer,
    });
  }, []);

  return (
    <article>
      <div className="flex items-center mb-4 space-x-4">
        <div className="space-y-1 font-medium dark:text-white">
          <p>
            {review.Buyer?.nickName}
            <time dateTime={format(review.createdAt, 'yyyy/MM/dd : hh')} className="block text-sm text-gray-500 dark:text-gray-400">
              {format(review.createdAt, 'yyyy/MM/dd')}
            </time>
          </p>
        </div>
      </div>

      {/* rating */}
      <ReviewRatingMole currentRating={review.star} />
      {/*</div>*/}
      {/* 댓글 및 내용 */}
      <p className="mb-2 text-gray-500 dark:text-gray-400">{review.content}</p>
    </article>
  );
}
