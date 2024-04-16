import { makeRequest } from 'helpers';

export const rateOrder = (orderId: number, rate: number) =>
  makeRequest('post', `/api/orders/${orderId}/rate`, { rate: rate });
