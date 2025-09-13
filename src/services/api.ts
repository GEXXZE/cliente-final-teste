import axios from 'axios';

const API_BASE_URL = axios.create({
  baseURL: 'https://meetservices.onrender.com/api/', 
  timeout: 5000,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json"
  }
});

let isRefreshing = false;

type FailedRequest = {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
};

let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

API_BASE_URL.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest.url !== '/auth/refresh') {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return API_BASE_URL(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        API_BASE_URL.post('/auth/refresh')
          .then(res => {
            const { accessToken } = res.data;
            API_BASE_URL.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;

            processQueue(null, accessToken);
            resolve(API_BASE_URL(originalRequest));
          })
          .catch(err => {
            processQueue(err, null);
            window.location.href = '/login'; 
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }

);

export default API_BASE_URL;
