import axios, { AxiosError } from "axios";
import { CASHCARPLUS_TOKEN } from "lib/constants";

const client = axios.create({
  baseURL: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_SERVER,
});

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  const { status, config } = error.response!;
  if (status === 401) {
    const authData = localStorage.getItem(CASHCARPLUS_TOKEN);
    if (!authData) {
      return Promise.reject(error);
    }
    const token = JSON.parse(authData)["token"];
    const userId = JSON.parse(authData)["userId"];
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
    client.defaults.headers.common.admin_user_id = `${userId}`;
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.admin_user_id = `${userId}`;
    if (config.method === "get") {
      return axios.get(config.url!, config);
    }
    if (config.method === "post") {
      return axios.get(config.url!, config);
    }
  }
  return Promise.reject(error);
};

client.interceptors.response.use(response => response, onResponseError);

client.interceptors.request.use(config => {
  const authData = localStorage.getItem(CASHCARPLUS_TOKEN);
  if (!authData) {
    return config;
  }
  const token = JSON.parse(authData)["token"];
  const userId = JSON.parse(authData)["userId"];
  config.headers.Authorization = `Bearer ${token}`;
  config.headers.admin_user_id = `${userId}`;
  return config;
});

export const setClientHeaders = (token: string, userId: number) => {
  client.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.admin_user_id = `${userId}`;
    return config;
  });
};

export default client;
