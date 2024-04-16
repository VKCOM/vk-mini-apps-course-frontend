import { IAddress } from 'panels/Order/types';

export const defaultAddress = {
  city: '',
  street: '',
  house: '',
  apartment: '',
  entrance: '',
  floor: '',
  comment: '',
};

export const enum EAddress {
  CITY = 'city',
  STREET = 'street',
  HOUSE = 'house',
  APARTMENT = 'apartment',
  ENTRANCE = 'entrance',
  FLOOR = 'floor',
  COMMENT = 'comment',
}

export const addressPartitions: IAddress = {
  city: 'г.',
  street: 'ул.',
  house: 'д.',
  apartment: 'кв.',
  entrance: 'п.',
  floor: 'э.',
  comment: '',
};
