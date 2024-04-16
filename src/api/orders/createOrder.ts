import { makeRequest } from 'helpers';
/*
  Модуль 4. Разработка Урок 8. Работа с внешним API #M4L8.
  Пример использования функции makeRequest для выполнения запроса.
*/
export const createOrder = (dishId: number, dishOptions: string[]) =>
  makeRequest('post', 'api/orders', {
    dish_id: dishId,
    dish_options: dishOptions,
  });
