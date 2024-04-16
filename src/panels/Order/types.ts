import { TDish, TExtraOption, TDishOption } from 'panels/Dishes/types';
import { EOrderStatus } from './consts';

type TOrder = {
  date: Date;
  delivery_address: TAddress;
  delivery_price: number;
  delivery_time: string;
  discount: number;
  dish: TDish;
  dish_options: TDishOption[];
  extra_options: TExtraOption[];
  id: number;
  price: number;
  rating: null | number;
  status: EOrderStatus;
};

type TAddress = {
  apartment: string;
  city: string;
  comment: string;
  entrance: string;
  floor: string;
  house: string;
  street: string;
};

type TOrderStep = {
  id: string;
  img: string;
  title: string;
  subtitle: string;
  label: string;
  status: EOrderStatus;
};

export interface IAddress {
  [key: string]: string | undefined;
}

export type { TOrder, TAddress, TOrderStep };
