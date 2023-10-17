import { IsIn, IsInt, IsNotEmpty, Min } from 'class-validator';
import { Cart } from '../domain/cart';

export class CartAddReq {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly productId: Cart['productId'];

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly productQuantity: Cart['productQuantity'];
}

export class CartChangeReq {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly id: Cart['id'];

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly productQuantity: Cart['productQuantity'];

  @IsNotEmpty()
  @IsIn(['ACTIVE', 'NONE'])
  readonly status: Cart['status'];
}

export class CartDeleteReq {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly id: Cart['id'];
}
