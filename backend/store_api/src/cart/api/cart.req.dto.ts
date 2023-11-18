import { IsIn, IsInt, IsNotEmpty, Min } from 'class-validator';
import { Cart } from '../domain/cart';
import { ApiProperty } from '@nestjs/swagger';

export class CartAddReq implements Pick<Cart, 'productId' | 'productQuantity'> {
  @ApiProperty({
    type: Number,
    required: true,
    description: '장바구니에 추가하고자 하는 product Id',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly productId: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: '해당 물품 수량',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly productQuantity: number;
}

export class CartChangeReq implements Pick<Cart, 'id' | 'productQuantity' | 'status'> {
  @ApiProperty({
    type: Number,
    required: true,
    description: '해당 cart id',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly id: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: '변경하고자 하는 수량',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly productQuantity: number;

  @ApiProperty({
    type: String,
    required: true,
    description: '장바구니 물품 상태 표기 ACTIVE: 장바구니에 담긴 물품 DONE: 구매 완료',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @IsIn(['ACTIVE', 'NONE'])
  readonly status: string;
}

export class CartDeleteReq implements Pick<Cart, 'id'> {
  @ApiProperty({
    type: Number,
    required: true,
    description: '삭제하고자 하는 cart id',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly id: number;
}
