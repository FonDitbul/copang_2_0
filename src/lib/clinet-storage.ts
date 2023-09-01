export type TokenStorageKey =
  | "accessToken"
  | "refreshToken"
  | "accessTokenExpireAt"
  | "refreshTokenExpireAt";

export function getStorage(key: TokenStorageKey): string | null {
  const result = localStorage.getItem(key);

  return result;
}

export function setStorage(key: TokenStorageKey, value: string) {
  localStorage.setItem(key, value);
  return;
}
