import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { Buyer, formattingPhoneNumber } from '../domain/buyer';

export class BuyerSignUpReq {
  @IsNotEmpty()
  readonly userId: Buyer['userId'];

  @IsNotEmpty()
  readonly password: Buyer['password'];

  @IsNotEmpty()
  readonly name: Buyer['name'];

  @IsNotEmpty()
  readonly nickName: Buyer['nickName'];

  @IsEmail()
  @IsNotEmpty()
  readonly email: Buyer['email'];

  @IsNotEmpty()
  @Transform(({ value }) => formattingPhoneNumber(value))
  readonly phoneNumber: Buyer['phoneNumber'];
}

export class BuyerLoginReq {
  @IsNotEmpty()
  readonly userId: Buyer['userId'];

  @IsNotEmpty()
  readonly password: Buyer['password'];
}

export class BuyerChangePasswordReq {
  @IsNotEmpty()
  readonly password: Buyer['password'];
}

export class BuyerChangeNickNameReq {
  @IsNotEmpty()
  readonly nickName: Buyer['nickName'];
}

export class BuyerChangeEmailReq {
  @IsEmail()
  @IsNotEmpty()
  readonly email: Buyer['email'];
}

export class BuyerChangePhoneNumberReq {
  @IsNotEmpty()
  @Transform(({ value }) => formattingPhoneNumber(value))
  readonly phoneNumber: Buyer['phoneNumber'];
}
