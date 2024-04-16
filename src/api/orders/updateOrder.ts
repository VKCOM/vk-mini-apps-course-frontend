import { makeRequest } from 'helpers';
import { TAddress } from 'panels/Order/types';

export const updateOrder = (
  orderId: number,
  address: TAddress | null,
  extraOptions: string[],
  isDiscountActivated: boolean,
) =>
  makeRequest('post', `api/orders/${orderId}`, {
    address: address,
    extra_options: extraOptions,
    is_discount_activated: isDiscountActivated,
  });
