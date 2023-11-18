import { ArrayNotEmpty, IsIn, IsInt, IsNotEmpty, IsNotEmptyObject, Matches, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderProduct } from '../domain/orderProduct';
import { OrderCard } from '../domain/orderCard';
import { ApiProperty } from '@nestjs/swagger';

export class Card implements Pick<OrderCard, 'method' | 'type' | 'bankName' | 'cardNumber' | 'cardType' | 'validityPeriod'> {
  @ApiProperty({
    type: String,
    example: 'CARD',
    description: '방법 입력 현재는 CARD만 가능',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @IsIn(['CARD'])
  readonly method: string;

  @ApiProperty({
    type: String,
    example: 'CARD',
    description: '주문하고자 하는 타입 입력 CARD 현재는 CARD만 가능',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @IsIn(['CARD'])
  readonly type: string;

  @ApiProperty({
    type: String,
    example: '신한은행',
    description: '은행 이름',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @MaxLength(100)
  readonly bankName: string;

  @ApiProperty({
    type: String,
    example: '0000-0000-0000-0000',
    description: '카드번호',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @MaxLength(100)
  readonly cardNumber: string;

  @ApiProperty({
    type: String,
    example: '체크카드',
    description: '체크카드 신용카드 등등',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @MaxLength(100)
  readonly cardType: string;

  @ApiProperty({
    type: String,
    example: '2023/09',
    description: '유효기간 YYYY/MM 형식으로 입력',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @Matches(RegExp('^((20\\d{2})\\/(0[1-9])|(1[0-2]))$'))
  readonly validityPeriod: string;
}

class BuyProduct implements Pick<OrderProduct, 'productId' | 'buyQuantity'> {
  @ApiProperty({
    type: Number,
    description: '구매하고자 하는 물품 id',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly productId: number;

  @ApiProperty({
    type: Number,
    description: '구매하고자 하는 물품 수량',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly buyQuantity: number;
}

export class OrderBuyProductReq {
  @ApiProperty({
    type: () => Card,
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Card)
  readonly card: Card;

  @ApiProperty({
    type: String,
    example:
      '{"postalCode":"08031","address":"서울 강남구 남부순환로103길 16","roadAddress":"서울 양천구 남부순환로103길 16","jibunAddress":"서울 강남구 21414","etc":"101호"}',
    description: '예시와 같은 json 형태의 string 데이터가 필요',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({
    type: [BuyProduct],
    description: '구매하고자 하는 물품 리스트 입력',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => BuyProduct)
  readonly products: BuyProduct[];
}
