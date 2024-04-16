import { makeRequest } from 'helpers';

export const getUserActiveOrder = (userId: number) =>
  makeRequest('get', `/api/users/${userId}/active-order`);
