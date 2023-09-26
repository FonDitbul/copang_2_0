import { IsNotEmpty, IsNotEmptyObject, IsNumberString, IsOptional, Matches, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateAddressReq {
  @IsNotEmpty()
  @IsNumberString()
  postalCode: string; // 우편 번호 ex) 13561

  @IsNotEmpty()
  address: string; // 전체 주소

  @IsNotEmpty()
  roadAddress: string; // 도로명 주소

  @IsNotEmpty()
  jibunAddress: string; // 구 주소 추가

  @IsOptional()
  etc?: string; // 기타 주소
}
export class BuyerCreateAddressReq {
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressReq)
  address: CreateAddressReq;
}

export class BuyerUpdateRepresentativeAddressReq {
  @IsNotEmpty()
  @Min(1)
  id: number;
}

export class BuyerDeleteAddressReq {
  @IsNotEmpty()
  @Min(1)
  id: number;
}

class CreateCardReq {
  @IsNotEmpty()
  @MaxLength(100)
  bankName: string;

  @IsNotEmpty()
  @MaxLength(100)
  cardNumber: string;

  @IsNotEmpty()
  @MaxLength(100)
  cardType: string;

  @IsNotEmpty()
  @Matches(RegExp('^((20\\d{2})\\/(0[1-9])|(1[0-2]))$'))
  validityPeriod: string;
}

export class BuyerCreateCardReq {
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateCardReq)
  card: CreateCardReq;
}

export class BuyerUpdateRepresentativeCardReq {
  @IsNotEmpty()
  @Min(1)
  id: number;
}

export class BuyerDeleteCardReq {
  @IsNotEmpty()
  @Min(1)
  id: number;
}
