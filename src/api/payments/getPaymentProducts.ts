import { makeRequest } from 'helpers';

export const getPaymentProducts = () =>
  makeRequest('get', 'api/payments/vote/products');
