import { Token } from '../../auth/domain/token';
import { Buyer } from '../domain/buyer';
import { ApiProperty } from '@nestjs/swagger';
import { BuyerGetAccountIn } from '../domain/port/buyer.in';

export class BuyerSignUpRes {
  readonly id: Buyer['id'];
  readonly userId: Buyer['userId'];
  readonly nickName: Buyer['nickName'];
  readonly email: Buyer['email'];
  readonly phoneNumber: Buyer['phoneNumber'];
  readonly deletedAt: Buyer['deletedAt'];
}

class TokenForSwagger extends Token {
  @ApiProperty({
    type: 'string',
    example: 'saffqwtq6y46sfzx',
    description: '발급된 토큰 값',
  })
  readonly value: string;

  @ApiProperty({
    type: 'string',
    example: '2023-11-17T16:59:42.172Z',
    description: '발급된 토큰 의 만료 날짜',
  })
  readonly expiredAt: Date;
}

export class BuyerLoginRes {
  @ApiProperty({
    type: () => TokenForSwagger,
    description: 'access 토큰',
  })
  // -----------------------------------------------
  readonly accessToken: Token;

  @ApiProperty({
    type: () => TokenForSwagger,
    description: 'refresh 토큰',
  })
  // -----------------------------------------------
  readonly refreshToken: Token;
}

export class BuyerAccountRes implements BuyerGetAccountIn {
  @ApiProperty({
    type: Number,
  })
  // -----------------------------------------------
  readonly id: number;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly userId: string;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly name: string;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly nickName: string;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly email: string;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly phoneNumber: string;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly createdAt: Date;

  @ApiProperty({
    type: String,
  })
  // -----------------------------------------------
  readonly updatedAt: Date;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  // -----------------------------------------------
  readonly deletedAt: Date | null;
}
