import { BuyerAddress } from '../domain/buyerAddress';
import { BuyerCard } from '../domain/buyerCard';
import { ApiProperty } from '@nestjs/swagger';
import { Card } from '../domain/card';

class BuyerAddressSwagger implements BuyerAddress {
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
  readonly address: string;

  @ApiProperty({
    type: Boolean,
  })
  // -----------------------------------------------
  readonly isRepresentative: boolean;

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
    nullable: true
  })
  // -----------------------------------------------
  readonly deletedAt: Date | null;
}
export class BuyerAccountAddressRes {
  @ApiProperty({
    type: [BuyerAddressSwagger],
    description: '구매자가 저장한 주소 목록',
  })
  readonly buyerAddresses: BuyerAddress[];
}

class BuyerCardSwagger implements BuyerCard, Pick<Card, 'bankName' | 'cardNumber' | 'cardType' | 'validityPeriod'> {
  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  id: number;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  bankName: string;

  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  buyerId: number;
  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  cardNumber: string;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  cardType: string;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  validityPeriod: string;

  @ApiProperty({
    type: Boolean,
  })
  // -----------------------------------------------
  isRepresentative: boolean;

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
export class BuyerAccountCardRes {
  @ApiProperty({
    type: [BuyerCardSwagger],
    description: '구매자가 저장한 카드 목록',
  })
  readonly buyerCards: BuyerCard[];
}
