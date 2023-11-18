import { IShippingStatus, OrderProduct } from '../domain/orderProduct';
import { ApiProperty } from '@nestjs/swagger';

class OrderProductSwagger implements OrderProduct {
  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  id: number;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  address: string;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  buyQuantity: number;
  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  buyerId: number;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  code: string;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  cost: number;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  description: string;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  information: string;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  mainImage: string;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  name: string;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  orderId: number;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  productId: number;

  @ApiProperty({
    type: Number,
    nullable: true,
  })
  // -----------------------------------------------
  reviewId: number | null;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  sellerId: number;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  shippingStatus: string | IShippingStatus;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  createdAt: Date;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  updatedAt: Date;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  // -----------------------------------------------
  deletedAt: Date | null;
}

export class OrderFindAllRes {
  @ApiProperty({
    type: () => [OrderProductSwagger],
  })
  // -----------------------------------------------
  orderProducts: OrderProduct[];
}
