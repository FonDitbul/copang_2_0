import { IsIn, IsInt, IsNotEmpty, Min } from 'class-validator';

export class CartAddReq {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  productId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  productQuantity: number;
}

export class CartChangeReq {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  productQuantity: number;

  @IsNotEmpty()
  @IsIn(['ACTIVE', 'NONE'])
  status: string;
}

export class CartDeleteReq {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;
}
