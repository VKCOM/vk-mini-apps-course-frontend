import { FC } from 'react';
import {
  Icon28CheckCircleOutline,
  Icon28CancelOutline,
  Icon28ChefHatOutline,
  Icon28CubeBoxOutline,
  Icon28CarOutline,
  Icon28DoneOutline,
} from '@vkontakte/icons';

import { EOrderStatus } from 'panels/Order/consts';

export type TIconProps = {
  className?: string;
};

export const getOrderStatusIcon = (status?: EOrderStatus): FC<TIconProps> => {
  switch (status) {
    case EOrderStatus.SUCCESS:
      return Icon28CheckCircleOutline;
    case EOrderStatus.FAILED:
      return Icon28CancelOutline;
    case EOrderStatus.CREATING:
      return Icon28ChefHatOutline;
    case EOrderStatus.PACKING:
      return Icon28CubeBoxOutline;
    case EOrderStatus.DELIVERING:
      return Icon28CarOutline;
    case EOrderStatus.COMPLETED:
      return Icon28DoneOutline;
    default:
      return () => null;
  }
};
