export type TokenStorageKey =
  | "accessToken"
  | "refreshToken"
  | "accessTokenExpireAt"
  | "refreshTokenExpireAt";

// setTimeOut을 통해 refresh token 재발급 로직 작성,
// refreshtoken 도 잘못되엇을 경우 clear

export function getStorage(key: TokenStorageKey): string | null {
  let result = null;
  if (typeof window !== "undefined") {
    result = localStorage.getItem(key);
  }

  // if(!result) {
  //   throw `존재하지 않는 ${key} 입니다. `
  // }
  return result;
}

export function setStorage(key: TokenStorageKey, value: string) {
  localStorage.setItem(key, value);
  return;
}

export function clearStorage() {
  localStorage.clear();
}
