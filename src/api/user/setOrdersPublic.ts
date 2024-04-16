import { makeRequest } from 'helpers';

export const setOrdersPublic = (userId: number) =>
  makeRequest('post', `/api/users/${userId}/set-orders-public`);
