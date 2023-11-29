import { IShippingStatus, OrderProduct } from '../domain/orderProduct';
import { ApiProperty } from '@nestjs/swagger';

class OrderProductSwagger implements OrderProduct {
  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  readonly id: number;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly address: string;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  readonly buyQuantity: number;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  readonly buyerId: number;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly code: string;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  readonly cost: number;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly description: string;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly information: string;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly mainImage: string;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly name: string;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  readonly orderId: number;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  readonly productId: number;

  @ApiProperty({
    type: Number,
    nullable: true,
  })
  // -----------------------------------------------
  readonly reviewId: number | null;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  readonly sellerId: number;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly shippingStatus: string | IShippingStatus;

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

export class OrderFindAllRes {
  @ApiProperty({
    type: () => [OrderProductSwagger],
  })
  // -----------------------------------------------
  readonly orderProducts: OrderProduct[];
}
