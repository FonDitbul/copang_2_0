import { Token } from './token';

export interface OneLoginToken {
  accessToken: Token;
  refreshToken: Token;
}

export class UserInfo {
  readonly id: number;
  readonly userId: string;
}

export interface ILoginToken {
  getOne: (userInfo: UserInfo) => OneLoginToken;
  verifyByAccess: (token: string) => UserInfo;
  verifyByRefresh: (token: string) => OneLoginToken;
}
