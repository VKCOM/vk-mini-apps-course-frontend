import { makeRequest } from 'helpers';

export const getUser = (userId: number) =>
  makeRequest('get', `/api/users/${userId}`);
