import { IsNotEmpty, IsNotEmptyObject, IsNumberString, IsOptional, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateAddressReq {
  @IsNotEmpty()
  @IsNumberString()
  postalCode: string; // 우편 번호 ex) 13561

  @IsNotEmpty()
  addressRegion: string; // 주소 중 가장 큰 지역명 ex) 경기

  @IsNotEmpty()
  addressLocality: string; // 하위 지역 ex) 성남시 분당구

  @IsNotEmpty()
  streetAddress: string; // 도로명 포함 상세 주소 ex) 정자일로 95

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
