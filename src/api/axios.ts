import axios from 'axios';

/*
  Модуль 4. Разработка Урок 8. Работа с внешним API #M4L8.
  Создание экземпляра axios для работы с внешним API.
*/
export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_DOMAIN_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `VK ${btoa(window.location.search)}`,
  },
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
