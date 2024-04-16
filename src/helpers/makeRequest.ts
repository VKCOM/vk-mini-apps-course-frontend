import { instance } from 'api/axios';

/*
  Модуль 4. Разработка Урок 8. Работа с внешним API #M4L8.
  Функция для выполнения запросов.
*/
export const makeRequest = async (
  method: string,
  url: string,
  params?: { [key: string]: unknown },
) => {
  try {
    const response = await instance({
      method: method,
      url: url,
      data: params,
    });

    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};
