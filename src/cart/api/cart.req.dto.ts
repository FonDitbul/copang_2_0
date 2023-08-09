import { IsInt, IsNotEmpty, Min } from 'class-validator';

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
