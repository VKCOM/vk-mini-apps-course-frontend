import { makeRequest } from 'helpers';
/*
  Модуль 7. Монетизация Урок 7. Продажа цифровых  и физических товаров: реализация #M7L7.
  Запрос для получения необходимых данных о заказе.
*/
export const getVKPayOrder = (orderId: number) =>
  makeRequest('get', `/api/orders/${orderId}/vkpay-data`);
