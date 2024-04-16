import { FC } from 'react';
import { Icon24CheckCircleOutline, Icon24CancelOutline } from '@vkontakte/icons';

import { EOrderStatus } from 'panels/Order/consts';
import { TIconProps } from './getOrderStatusIcon';

export const getUserOrderStatusIcon = (status?: EOrderStatus): FC<TIconProps> => {
  switch (status) {
    case EOrderStatus.COMPLETED:
      return Icon24CheckCircleOutline;
    case EOrderStatus.CANCELED:
      return Icon24CancelOutline;
    default:
      return () => null;
  }
};
