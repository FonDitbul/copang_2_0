import axios, { Axios } from "axios";

export const serverUrl = "192.168.0.16:5000";

export interface ResponseData<T> {
  isSuccess: boolean;
  content: T;
  errorCode?: number;
}

export const Client: Axios = axios.create({
  baseURL: `http://${serverUrl}`,
  headers: {
    'Content-Type': 'application/json'
  }
});
