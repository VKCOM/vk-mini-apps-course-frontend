import { makeRequest } from 'helpers';

export const getDishes = () => makeRequest('get', 'api/dishes');
