import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { Buyer, formattingPhoneNumber } from '../domain/buyer';
import { ApiProperty } from '@nestjs/swagger';

export class BuyerSignUpReq implements Pick<Buyer, 'userId' | 'password' | 'name' | 'nickName' | 'email' | 'phoneNumber'> {
  @ApiProperty({
    type: String,
    example: 'copang1234',
    description: '가입하고자 하는 유저 아이디',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({
    type: String,
    example: 'copang1234!!',
    description: '가입하고자 하는 유저 비밀번호 설정',
  })
  // ------------------------------------------------
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    type: String,
    example: '코팡맨',
    description: '구매자 이름',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    type: String,
    example: '구매코팡맨',
    description: '구매자 닉네임',
  })
  // -----------------------------------------------
  @IsNotEmpty()
  readonly nickName: string;

  @ApiProperty({
    type: String,
    example: 'copang@copang.com',
    description: '구매자 이메일',
  })
  // -----------------------------------------------
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    type: String,
    example: '010-1234-5678',
    description: '핸드폰 번호 하이픈, 띄어쓰기 내부 로직에 의한 제거',
  })
  // ---------------------------------------------------
  @IsNotEmpty()
  @Transform(({ value }) => formattingPhoneNumber(value))
  readonly phoneNumber: string;
}

export class BuyerLoginReq implements Pick<Buyer, 'userId' | 'password'> {
  @ApiProperty({
    type: String,
    example: 'copang1234',
    description: '로그인 하고자 하는 구매자의 아이디 입력',
  })
  // ---------------------------------------------------
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({
    type: String,
    example: 'copang1234!!',
    description: '로그인 하고자 하는 구매자의 비밀번호 입력',
  })
  // ---------------------------------------------------
  @IsNotEmpty()
  readonly password: string;
}

export class BuyerChangePasswordReq implements Pick<Buyer, 'password'> {
  @ApiProperty({
    type: String,
    example: 'copang1234!!@',
    description: '변경하고자 하는 password 입력',
  })
  // ---------------------------------------------------
  @IsNotEmpty()
  readonly password: string;
}

export class BuyerChangeNickNameReq implements Pick<Buyer, 'nickName'> {
  @ApiProperty({
    type: String,
    example: '코팡맨2',
    description: '변경하고자 하는 닉네임 입력',
  })
  // ---------------------------------------------------
  @IsNotEmpty()
  readonly nickName: string;
}

export class BuyerChangeEmailReq implements Pick<Buyer, 'email'> {
  @ApiProperty({
    type: String,
    example: 'copang@copang.com',
    description: '변경하고자 하는 이메일 입력',
  })
  // ---------------------------------------------------
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

export class BuyerChangePhoneNumberReq implements Pick<Buyer, 'phoneNumber'> {
  @ApiProperty({
    type: String,
    example: '01012345678',
    description: '변경하고자 하는 핸드폰번호 입력',
  })
  // ---------------------------------------------------
  @IsNotEmpty()
  @Transform(({ value }) => formattingPhoneNumber(value))
  readonly phoneNumber: string;
}
