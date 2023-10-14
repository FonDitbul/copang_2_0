import { IsNotEmpty, IsNotEmptyObject, IsNumberString, IsOptional, Matches, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Address } from '../domain/address';
import { BuyerAddress } from '../domain/buyerAddress';
import { BuyerCard } from '../domain/buyerCard';

class CreateAddressReq {
  @IsNotEmpty()
  @IsNumberString()
  readonly postalCode: Address['postalCode']; // 우편 번호 ex) 13561

  @IsNotEmpty()
  readonly address: Address['address']; // 전체 주소

  @IsNotEmpty()
  readonly roadAddress: Address['roadAddress']; // 도로명 주소

  @IsNotEmpty()
  readonly jibunAddress: Address['jibunAddress']; // 구 주소 추가

  @IsOptional()
  readonly etc?: Address['etc']; // 기타 주소
}
export class BuyerCreateAddressReq {
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressReq)
  readonly address: CreateAddressReq;
}

export class BuyerUpdateRepresentativeAddressReq {
  @IsNotEmpty()
  @Min(1)
  readonly id: BuyerAddress['id'];
}

export class BuyerDeleteAddressReq {
  @IsNotEmpty()
  @Min(1)
  readonly id: BuyerAddress['id'];
}

class CreateCardReq {
  @IsNotEmpty()
  @MaxLength(100)
  readonly bankName: BuyerCard['bankName'];

  @IsNotEmpty()
  @MaxLength(100)
  readonly cardNumber: BuyerCard['cardNumber'];

  @IsNotEmpty()
  @MaxLength(100)
  readonly cardType: BuyerCard['cardType'];

  @IsNotEmpty()
  @Matches(RegExp('^((20\\d{2})\\/(0[1-9])|(1[0-2]))$'))
  readonly validityPeriod: BuyerCard['validityPeriod'];
}

export class BuyerCreateCardReq {
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateCardReq)
  readonly card: CreateCardReq;
}

export class BuyerUpdateRepresentativeCardReq {
  @IsNotEmpty()
  @Min(1)
  readonly id: BuyerCard['id'];
}

export class BuyerDeleteCardReq {
  @IsNotEmpty()
  @Min(1)
  readonly id: BuyerCard['id'];
}
