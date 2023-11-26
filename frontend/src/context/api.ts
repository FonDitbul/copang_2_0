import axios, { Axios } from 'axios';
import { ClientStorage } from './ClientStorage';
import { isBiggerLeftDate } from '@libs/utils';
import { AuthRefreshTokenStrategy } from './AuthTokenStrategy';

export const serverUrl = 'api.copang.p-e.kr/';

export interface ResponseData<T> {
  isSuccess: boolean;
  content: T;
  errorCode?: number;
}

export const Client: Axios = axios.create({
  baseURL: `http://${serverUrl}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

Client.interceptors.request.use((config) => {
  try {
    const accessToken = ClientStorage.getTokenByKey('accessToken');
    const accessTokenExpireAt = ClientStorage.getTokenByKey('accessTokenExpireAt');

    const currentDate = new Date();
    const accessTokenExpireDate = new Date(accessTokenExpireAt);

    if (isBiggerLeftDate(currentDate, accessTokenExpireDate)) {
      throw new Error('만료된 토큰입니다.');
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  } catch (e) {
    return config;
  }
});

Client.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response.data && (error.response.data.errorCode === 10002 || error.response.data.errorCode === 10001)) {
      try {
        const originalRequest = error.config;

        const accessToken = await AuthRefreshTokenStrategy();

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return await Client.request(originalRequest);
      } catch (e) {
        ClientStorage.clear();
        console.log(e);
      }
      ClientStorage.clear();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
