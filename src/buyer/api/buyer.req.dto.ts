import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { Buyer, formattingPhoneNumber } from '../domain/buyer';

export class BuyerSignUpReq {
  @IsNotEmpty()
  readonly userId: Buyer['userId'];

  @IsNotEmpty()
  password: Buyer['password'];

  @IsNotEmpty()
  name: Buyer['name'];

  @IsNotEmpty()
  nickName: Buyer['nickName'];

  @IsEmail()
  @IsNotEmpty()
  email: Buyer['email'];

  @IsNotEmpty()
  @Transform(({ value }) => formattingPhoneNumber(value))
  phoneNumber: Buyer['phoneNumber'];
}

export class BuyerLoginReq {
  @IsNotEmpty()
  userId: Buyer['userId'];

  @IsNotEmpty()
  password: Buyer['password'];
}

export class BuyerChangePasswordReq {
  @IsNotEmpty()
  password: Buyer['password'];
}

export class BuyerChangeNickNameReq {
  @IsNotEmpty()
  nickName: Buyer['nickName'];
}

export class BuyerChangeEmailReq {
  @IsEmail()
  @IsNotEmpty()
  email: Buyer['email'];
}

export class BuyerChangePhoneNumberReq {
  @IsNotEmpty()
  @Transform(({ value }) => formattingPhoneNumber(value))
  phoneNumber: Buyer['phoneNumber'];
}
