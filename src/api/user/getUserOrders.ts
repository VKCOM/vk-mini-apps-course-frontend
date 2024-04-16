import { makeRequest } from 'helpers';

export const getUserOrders = (userId: number) =>
  makeRequest('get', `/api/users/${userId}/orders`);
