import { IsNotEmpty, IsNotEmptyObject, IsNumberString, IsOptional, Matches, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Address } from '../domain/address';
import { BuyerAddress } from '../domain/buyerAddress';
import { BuyerCard } from '../domain/buyerCard';

class CreateAddressReq {
  @IsNotEmpty()
  @IsNumberString()
  postalCode: Address['postalCode']; // 우편 번호 ex) 13561

  @IsNotEmpty()
  address: Address['address']; // 전체 주소

  @IsNotEmpty()
  roadAddress: Address['roadAddress']; // 도로명 주소

  @IsNotEmpty()
  jibunAddress: Address['jibunAddress']; // 구 주소 추가

  @IsOptional()
  etc?: Address['etc']; // 기타 주소
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
  id: BuyerAddress['id'];
}

export class BuyerDeleteAddressReq {
  @IsNotEmpty()
  @Min(1)
  id: BuyerAddress['id'];
}

class CreateCardReq {
  @IsNotEmpty()
  @MaxLength(100)
  bankName: BuyerCard['bankName'];

  @IsNotEmpty()
  @MaxLength(100)
  cardNumber: BuyerCard['cardNumber'];

  @IsNotEmpty()
  @MaxLength(100)
  cardType: BuyerCard['cardType'];

  @IsNotEmpty()
  @Matches(RegExp('^((20\\d{2})\\/(0[1-9])|(1[0-2]))$'))
  validityPeriod: BuyerCard['validityPeriod'];
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
  id: BuyerCard['id'];
}

export class BuyerDeleteCardReq {
  @IsNotEmpty()
  @Min(1)
  id: BuyerCard['id'];
}
