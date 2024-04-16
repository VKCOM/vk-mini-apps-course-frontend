import { addressPartitions } from 'panels/Order/components/AddressModal/const';
import { IAddress } from 'panels/Order/types';

/**
 * Функция парсит адрес и возвращает значение с дополнительными сокращениями
 * deliveryAddress - объект с полями
 * city: string;
 * street: string;
 * house: string;
 * apartment: string;
 * entrance: string;
 * floor: string;
 * comment: string;
 * Для каждого из полей, кроме comment соответствует префикс, например для city - г.
 * Возвращаемое значение г. Москва, ул. Садовая, д. 3, кв. 2, п. 3, э. 13
 */

export const parseAddress = (deliveryAddress: IAddress | null) => {
  if (!deliveryAddress) {
    return '';
  }
  const res = [];

  for (const prop in deliveryAddress) {
    if (deliveryAddress[prop] && prop !== 'comment') {
      res.push(`${addressPartitions[prop]} ${deliveryAddress[prop]}`);
    }
  }

  return res.join(', ');
};
