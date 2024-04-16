import { makeRequest } from 'helpers';

export const markNotificationsAsViewed = (userId: number) =>
  makeRequest('post', `api/users/${userId}/notifications/mark-as-viewed`);
