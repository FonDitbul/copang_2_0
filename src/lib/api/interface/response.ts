export interface Response<T> {
  isSuccess: boolean;
  content: T;
  errorCode?: number;
}
