import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useUserStore } from '@/stores/userStore';


const baseURL = 'http://localhost:5000/api';

const refreshOldToken = async () => {
  try {
    const userStore = useUserStore();
    const userToken = userStore.userToken;
    const { data } = await axios.post('/refresh', { token: userToken.accessToken });

    userToken = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    }
    
    return res.data
  } catch (error) {
    console.log('Ошибка при обновлении токена:', error);
  }
}

const api = axios.create({
  withCredentials: true,
  baseURL: baseURL
});

api.interceptors.request.use((config) => {
  const userStore = useUserStore();
  const token = userStore.userToken.accessToken;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const userStore = useUserStore();
    const decodedToken = jwtDecode(userStore.userToken.accessToken);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshOldToken();
      config.headers["authorization"] = `Bearer ${data.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;