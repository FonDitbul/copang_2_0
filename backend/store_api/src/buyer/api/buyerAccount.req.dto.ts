import { IsNotEmpty, IsNotEmptyObject, IsNumberString, IsOptional, Matches, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Address } from '../domain/address';
import { BuyerAddress } from '../domain/buyerAddress';
import { BuyerCard } from '../domain/buyerCard';
import { ApiProperty } from '@nestjs/swagger';

class CreateAddressReq implements Pick<Address, 'postalCode' | 'address' | 'roadAddress' | 'jibunAddress' | 'etc'> {
  @ApiProperty({
    type: String,
    example: '13561',
    description: '우편 번호',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @IsNumberString()
  readonly postalCode: string;

  @ApiProperty({
    type: String,
    description: '전체 주소',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({
    type: String,
    description: '도로명 주소',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  readonly roadAddress: string;

  @ApiProperty({
    type: String,
    example: '서초동 1587-1',
    description: '구 주소 추가, 지번 주소',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  readonly jibunAddress: string;

  @ApiProperty({
    type: String,
    example: '101호',
    required: false,
    description: '기타 주소',
  })
  // -----------------------------------------------
  @IsOptional()
  readonly etc?: string;
}
export class BuyerCreateAddressReq {
  @ApiProperty({
    type: () => CreateAddressReq,
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressReq)
  readonly address: CreateAddressReq;
}

export class BuyerUpdateRepresentativeAddressReq implements Pick<BuyerAddress, 'id'> {
  @ApiProperty({
    type: Number,
    example: 1,
    description: '조회한 구매자의 주소 목록 중 대표로 변경하고자 하는 id',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @Min(1)
  readonly id: number;
}

export class BuyerDeleteAddressReq implements Pick<BuyerAddress, 'id'> {
  @ApiProperty({
    type: Number,
    example: 1,
    description: '조회한 구매자의 주소 목록 중 삭제하고자 하는 id',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @Min(1)
  readonly id: number;
}

class CreateCardReq implements Pick<BuyerCard, 'bankName' | 'cardNumber' | 'cardType' | 'validityPeriod'> {
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
    example: '1234-5678-1111-1111',
    description: '카드번호',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @MaxLength(100)
  readonly cardNumber: string;

  @ApiProperty({
    type: String,
    example: '체크카드',
    description: '카드 타입, 체크카드, 신용카드 등',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @MaxLength(100)
  readonly cardType: string;

  @ApiProperty({
    type: String,
    example: '2025/12/23',
    description: '유효 기간 입력 20YY/MM/DD 형식으로 입력 필요',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @Matches(RegExp('^((20\\d{2})\\/(0[1-9])|(1[0-2]))$'))
  readonly validityPeriod: string;
}

export class BuyerCreateCardReq {
  @ApiProperty({
    type: () => CreateCardReq,
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateCardReq)
  readonly card: CreateCardReq;
}

export class BuyerUpdateRepresentativeCardReq implements Pick<BuyerCard, 'id'> {
  @ApiProperty({
    type: Number,
    example: 1,
    description: '조회한 구매자의 카드 목록 중 대표로 설정하고자 하는 id',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @Min(1)
  readonly id: number;
}

export class BuyerDeleteCardReq implements Pick<BuyerCard, 'id'> {
  @ApiProperty({
    type: Number,
    example: 1,
    description: '조회한 구매자의 카드 목록 중 삭제 하고자 하는 id',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  @Min(1)
  readonly id: number;
}
