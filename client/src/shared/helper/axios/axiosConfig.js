import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useUserStore } from '@/stores/userStore';


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
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosToken.interceptors.request.use((config) => {
  const userStore = useUserStore();
  const token = userStore.userToken.accessToken;
  config.headers.Authorization = "Bearer " + token;
  return config;
});

axiosToken.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const accessToken = localStorage.getItem('userData');
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshOldToken();
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