import axios, { AxiosRequestConfig } from 'axios';
import interceptorClient from '@/common/api/interceptorClient';
import interceptorServer from '@/common/api/interceptorServer';

export const fetcher = {
  get: (url: string, data?: any, config?: AxiosRequestConfig) => {
    let configure = config || {};
    configure.params = data;
    return interceptorClient.get(url, configure);
  },

  post: (url: string, data?: any, config?: AxiosRequestConfig) => {
    let body = data || {};
    return interceptorClient.post(url, body, config);
  },

  put: (url: string, data?: any, config?: AxiosRequestConfig) => {
    let body = data || {};
    return interceptorClient.put(url, body, config);
  },

  delete: (url: string, config?: AxiosRequestConfig) => {
    return interceptorClient.delete(url, config);
  },

  getServer: (url: string, data?: any, config?: AxiosRequestConfig) => {
    let configure = config || {};
    configure.params = data;
    return interceptorServer.get(url, configure);
  },

  postServer: (url: string, data?: any, config?: AxiosRequestConfig) => {
    let body = data || {};
    return interceptorServer.post(url, body, config);
  },

  putServer: (url: string, data?: any, config?: AxiosRequestConfig) => {
    let body = data || {};
    return interceptorServer.put(url, body, config);
  },

  deleteServer: (url: string, config?: AxiosRequestConfig) => {
    return interceptorServer.delete(url, config);
  },

  getRambda: (url: string, data?: any, config?: AxiosRequestConfig) => {
    let configure = config || {};
    configure.params = data;
    return axios.get(url, configure);
  }
};
