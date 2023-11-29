import { Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

class ProductSwagger implements Product {
  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  readonly id: number;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  readonly categoryId: number;

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
    type: Boolean,
  })
  // -----------------------------------------------
  readonly isSale: boolean;

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
    type: String,
  })
  // -----------------------------------------------
  readonly quantity: number;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  readonly sellerId: number;

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
export class ProductFindAllRes {
  @ApiProperty({
    type: () => [ProductSwagger],
  })
  // -----------------------------------------------
  readonly products: Product[];

  @ApiProperty({
    type: Boolean,
    description: '현재 페이지가 끝페이지 인지',
  })
  // -----------------------------------------------
  readonly isEndPage: boolean;
}

export class ProductFindOneRes {
  @ApiProperty({
    type: ProductSwagger,
  })
  // -----------------------------------------------
  readonly product: Product;
}
