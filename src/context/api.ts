import axios, { Axios } from "axios";

export const serverUrl = "192.168.0.16:5000";

export interface Response<T> {
  isSuccess: boolean;
  content: T;
  errorCode?: number;
}

export const client: Axios = axios.create({
  baseURL: `http://${serverUrl}`,
  headers: {
    'Content-Type': 'application/json'
  }
});
