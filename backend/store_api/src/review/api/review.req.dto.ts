import { IsNumber, IsString, Max, Min } from 'class-validator';
import { Review } from '../domain/review';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewCreateByBuyerReq implements Pick<Review, 'star' | 'content' | 'orderProductId'> {
  @ApiProperty({
    type: Number,
    required: true,
    description: '0 ~ 10 후기 별점',
  })
  // -----------------------------------------------
  @IsNumber()
  @Max(10)
  @Min(0)
  readonly star: number;

  @ApiProperty({
    type: String,
    required: true,
    description: '후기 내용',
  })
  // -----------------------------------------------
  @IsString()
  readonly content: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '해당 물품 주문 id ',
  })
  // -----------------------------------------------
  @IsNumber()
  @Min(1)
  readonly orderProductId: number;
}
