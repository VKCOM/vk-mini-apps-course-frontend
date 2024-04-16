import { makeRequest } from 'helpers';

export const getUsersList = (data?: Array<number>) =>
  makeRequest('post', '/api/users/rating', data && { friends: data });
