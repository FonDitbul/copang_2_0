import { IsNumber, IsString, Max, Min } from 'class-validator';
import { Review } from '../domain/review';

export class ReviewCreateByBuyerReq {
  @IsNumber()
  @Max(10)
  @Min(0)
  readonly star: Review['star'];

  @IsString()
  readonly content: Review['content'];

  @IsNumber()
  @Min(1)
  readonly orderProductId: Review['orderProductId'];
}
