import { makeRequest } from 'helpers';

export const getOrder = (orderId: number) =>
  makeRequest('get', `/api/orders/${orderId}`);
