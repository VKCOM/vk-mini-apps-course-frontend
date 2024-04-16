import { useMemo } from 'react';
import { Banner } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { getOrderStatusIcon } from 'helpers';
import { orderSteps } from 'mocks/orders';
import { EOrderStatus } from 'panels/Order/consts';
import { TOrder } from 'panels/Order/types';

import styles from './OrderBanner.module.css';

const OrderBanner = ({ status, id }: TOrder) => {
  const routeNavigator = useRouteNavigator();
  const { subtitle, title } =
    orderSteps.find((step) => step.status === status) || orderSteps[0];
  const Icon = useMemo(() => getOrderStatusIcon(status), [status]);

  const handleOrderOnClick = () => {
    if (
      status === EOrderStatus.NEW ||
      status === EOrderStatus.AWAITING_PAYMENT
    ) {
      void routeNavigator.push(`/order/${id}`);
    } else {
      void routeNavigator.push(`/order-status/${id}`);
    }
  };

  return (
    <Banner
      header={title}
      subheader={subtitle}
      asideMode="expand"
      onClick={handleOrderOnClick}
      before={<Icon />}
      mode="image"
      className={styles.container}
      background={<div className={styles.containerBg} />}
    />
  );
};

export default OrderBanner;
