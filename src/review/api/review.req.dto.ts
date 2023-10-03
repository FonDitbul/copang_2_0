import { IsNumber, IsString, Max, Min } from 'class-validator';

export class ReviewCreateByBuyerReq {
  @IsNumber()
  @Max(10)
  @Min(0)
  star: number;

  @IsString()
  content: string;

  @IsNumber()
  @Min(1)
  orderProductId: number;
}
