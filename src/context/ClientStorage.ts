export type TokenKey = "accessToken" | "accessTokenExpireAt" | "refreshToken" | "refreshTokenExpireAt";

export type Token = {
  value: string;
  expiredAt: string;
};
export type LoginToken = {
  accessToken: Token;
  refreshToken: Token;
};
export class ClientStorage {
  static getTokenByKey(key: TokenKey): string {
    const value = localStorage.getItem(key);
    if (!value) {
      throw new Error("not exist value");
    }
    return value;
  }
  static setToken(key: TokenKey, value: string) {
    localStorage.setItem(key, value);
  }
  static setTokenAfterLogin(loginToken: LoginToken) {
    this.setToken("accessToken", loginToken.accessToken.value);
    this.setToken("accessTokenExpireAt", loginToken.accessToken.expiredAt); // UTC로 저장
    this.setToken("refreshToken", loginToken.refreshToken.value);
    this.setToken("refreshTokenExpireAt", loginToken.refreshToken.expiredAt); // UTC로 저장
    console.log(loginToken);
  }
  static clear() {
    localStorage.clear();
  }
}
