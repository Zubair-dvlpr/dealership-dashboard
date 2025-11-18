// Library Imports
import axios from 'axios';

// Local Imports
import { baseURL } from './constant';
import { useAuthStore } from './features/auth/useAuthStore';

const axiosInstance = axios.create({
  baseURL
});

export const setAuthToken = token => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    function (config) {
      return config;
    },
    function (error) {
      console.log('error from https', error);
      if (!navigator.onLine) {
        console.log('No internet connection');
      }
      if (error?.response?.status === 401) {
        useAuthStore.getState().logout();
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
