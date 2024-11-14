import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { setTokens } from '../redux/customersSlice';

axios.defaults.withCredentials = true;

const refreshToken = async () => {
  try {
    const res = await axios.post('http://localhost:8000/api/auth/refresh', {
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    console.log('Error refreshing token:', error);
    throw error;
  }
};

export const createAxiosInstance = (user, dispatch, additionalConfig = {}) => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    ...additionalConfig,
  });
  axiosInstance.interceptors.request.use(
    async (config) => {
      const date = new Date();
      const decodedToken = jwtDecode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        try {
          const newTokens = await refreshToken();
          const refreshedUser = {
            ...user,
            accessToken: newTokens.accessToken,
          };
          dispatch(setTokens(refreshedUser));
          config.headers['token'] = `Bearer ${newTokens.accessToken}`;
        } catch (error) {
          console.log('Error refreshing token:', error);
          throw error;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
