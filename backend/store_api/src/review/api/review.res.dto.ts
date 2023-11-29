import { Review } from '../domain/review';
import { ApiProperty } from '@nestjs/swagger';
class ReviewSwagger implements Review {
  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  readonly id: number;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  readonly buyerId: number;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly content: string;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  readonly orderProductId: number;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  readonly productId: number;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  readonly star: number;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly createdAt: Date;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly updatedAt: Date;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  // -----------------------------------------------
  readonly deletedAt: Date | null;
}
export class ReviewFindAllRes {
  @ApiProperty({
    type: [ReviewSwagger],
  })
  // -----------------------------------------------
  readonly list: Review[];
}
