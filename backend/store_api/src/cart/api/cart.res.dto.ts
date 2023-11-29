import { Cart } from '../domain/cart';
import { ApiProperty } from '@nestjs/swagger';

class CartSwagger implements Cart {
  @ApiProperty({
    type: Number,
    description: 'cart id',
  })
  // -----------------------------------------------
  readonly id: number;

  @ApiProperty({
    type: Number,
    description: '해당 유저 아이디',
  })
  // -----------------------------------------------
  readonly buyerId: number;

  @ApiProperty({
    type: Number,
    description: '장바구니에 담긴 물품 아이디',
  })
  // -----------------------------------------------
  readonly productId: number;

  @ApiProperty({
    type: Number,
    description: '구매하고자 하는 수량',
  })
  // -----------------------------------------------
  readonly productQuantity: number;

  @ApiProperty({
    type: String,
    description: '장바구니 물품 상태 표기 ACTIVE: 장바구니에 담긴 물품 DONE: 구매 완료',
  })
  // -----------------------------------------------
  readonly status: string;

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
export class CartFindAllRes {
  @ApiProperty({
    type: [CartSwagger],
    description: '해당 page 이후로 데이터가 없을시 true',
  })
  // ------------------------------------------------
  readonly carts: Cart[];

  @ApiProperty({
    type: Boolean,
    description: '해당 page 이후로 데이터가 없을시 true',
  })
  // ------------------------------------------------
  readonly isEndPage: boolean;
}
