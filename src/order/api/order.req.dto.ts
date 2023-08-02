import { IsInt, IsNotEmpty, IsNotEmptyObject, Matches, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Card {
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
  @Matches(RegExp('^((0[1-9])|(1[0-2]))\\/(\\d{2})$'))
  validityPeriod: string;
}

class BuyProduct {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  productId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}

export class OrderBuyProductReq {
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Card)
  card: Card;

  @IsNotEmpty()
  @MaxLength(100)
  address: string;

  @IsNotEmpty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => BuyProduct)
  product: BuyProduct[];
}
