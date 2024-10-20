'use client';

import axios from 'axios';

const interceptorClient = axios.create({
  baseURL: '/api',
  timeout: 15000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
});

interceptorClient.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
interceptorClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorResponse = error.response || {};
    let errorData = errorResponse.data || {};
    let status = errorResponse.status || 500;

    if (status >= 400 && status < 500) {
      // 클라이언트 오류
    } else if (status >= 500) {
      // 서버 오류
    }

    return Promise.reject(errorData);
  }
);

export default interceptorClient;
