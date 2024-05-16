import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useUserStore } from '@/stores/userStore';
import Cookies from "js-cookie";


const baseURL = 'http://localhost:5000/api';

const refreshOldToken = async () => {
  try {
    const userStore = useUserStore();
    const userToken = userStore.userToken;
    const data = await axios.post('http://localhost:5000/api/refresh', {}, {
      withCredentials: true
    });

    userToken = {
      accessToken: data.accessToken
    }

    return res.data
  } catch (error) {
    console.log('Ошибка при обновлении токена:', error);
  }
}

const axiosToken = axios.create({
  withCredentials: true,
  baseURL: baseURL
});

axiosToken.interceptors.request.use((config) => {
  const userStore = useUserStore();
  const token = userStore.userToken.accessToken;
  // console.log('token', userStore.userToken.accessToken)
  config.headers.Authorization = "Bearer " + token;
  return config;
});

axiosToken.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const userStore = useUserStore();
    if (userStore.userToken.accessToken) {
      const decodedToken = jwtDecode(userStore.userToken.accessToken);
      // console.log('decode token', decodedToken)
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshOldToken();
        // console.log('refresh old token:', data)
        config.headers["Authorization"] = "Bearer " + data.accessToken;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosToken;