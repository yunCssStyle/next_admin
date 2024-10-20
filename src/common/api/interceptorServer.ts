import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Logger from '@/common/api/Logger';

const interceptorServer = axios.create({
  baseURL: `${process.env.API_URL}/api`,
  timeout: 15000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
});

interceptorServer.interceptors.request.use(
  async (config) => {
    const session = await getServerSession(authOptions);
    config.headers.memberId = `${session?.user.userId}`;
    Logger.debug(`Request : ${JSON.stringify(config)}`);
    return config;
  },
  (error) => {
    Logger.debug(`Error Request : ${JSON.stringify(error)}`);
    return Promise.reject(error);
  }
);
interceptorServer.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorResponse = error.response || {};
    let errorData = errorResponse.data || {};

    Logger.debug(`Error Response : ${JSON.stringify(error)}`);

    return Promise.reject(errorData);
  }
);

export default interceptorServer;
