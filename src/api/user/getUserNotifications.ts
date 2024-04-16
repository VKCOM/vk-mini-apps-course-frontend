import { makeRequest } from 'helpers';

export const getUserNotifications = (userId: number) =>
  makeRequest('get', `api/users/${userId}/notifications`);
