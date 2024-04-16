import { makeRequest } from 'helpers';

export const setFavourite = (restaurantId: number) =>
  makeRequest('post', `/api/restaurant/${restaurantId}/set-favorite`);
