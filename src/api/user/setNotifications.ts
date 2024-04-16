import { makeRequest } from 'helpers';

export const setNotifications = (userId: number) =>
  makeRequest('post', `/api/users/${userId}/set-notifications`);
