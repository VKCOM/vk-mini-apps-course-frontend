import { makeRequest } from 'helpers';

export const getDish = (dishId: number) =>
  makeRequest('get', `/api/dishes/${dishId}`);
