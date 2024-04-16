import { makeRequest } from 'helpers';

export const cancelOrder = (orderId: number) =>
  makeRequest('post', `/api/orders/${orderId}/cancel`);
