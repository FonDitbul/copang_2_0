import { ArrayNotEmpty, IsIn, IsInt, IsNotEmpty, IsNotEmptyObject, Matches, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderProduct } from '../domain/orderProduct';
import { OrderCard } from '../domain/orderCard';

export class Card {
  @IsNotEmpty()
  @IsIn(['CARD'])
  readonly method: OrderCard['method'];

  @IsNotEmpty()
  @IsIn(['CARD'])
  readonly type: OrderCard['type'];

  @IsNotEmpty()
  @MaxLength(100)
  readonly bankName: OrderCard['bankName'];

  @IsNotEmpty()
  @MaxLength(100)
  readonly cardNumber: OrderCard['cardNumber'];

  @IsNotEmpty()
  @MaxLength(100)
  readonly cardType: OrderCard['cardType'];

  @IsNotEmpty()
  @Matches(RegExp('^((20\\d{2})\\/(0[1-9])|(1[0-2]))$'))
  readonly validityPeriod: OrderCard['validityPeriod'];
}

class BuyProduct {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly productId: OrderProduct['productId'];

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly buyQuantity: OrderProduct['buyQuantity'];
}

export class OrderBuyProductReq {
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Card)
  readonly card: Card;

  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => BuyProduct)
  readonly products: BuyProduct[];
}
