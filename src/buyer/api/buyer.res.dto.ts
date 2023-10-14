import { Token } from '../../auth/domain/token';
import { Buyer } from '../domain/buyer';

export class BuyerSignUpRes {
  readonly id: Buyer['id'];
  readonly userId: Buyer['userId'];
  readonly nickName: Buyer['nickName'];
  readonly email: Buyer['email'];
  readonly phoneNumber: Buyer['phoneNumber'];
  readonly deletedAt: Buyer['deletedAt'];
}

export class BuyerLoginRes {
  readonly accessToken: Token;
  readonly refreshToken: Token;
}
