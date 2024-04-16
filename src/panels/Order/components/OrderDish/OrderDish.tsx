import { useRef } from 'react';
import { Group, Title, Subhead, Header, IconButton } from '@vkontakte/vkui';
import { Icon20More } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { Dish } from 'panels/Dishes/components';
import { TDish } from 'panels/Dishes/types';
import { OrderOptionsPopout } from 'panels/Order/components';

import styles from './OrderDish.module.css';

type Props = {
  dish: TDish;
  orderId: number;
  parsedDishOptions: string;
  isDeliveryInProgress: boolean;
  onCancelOrder: () => void;
  copyLink: () => void;
};

const OrderDish = ({
  parsedDishOptions,
  orderId,
  dish,
  isDeliveryInProgress,
  onCancelOrder,
  copyLink,
}: Props) => {
  const btnMoreRef = useRef<HTMLElement | null>(null);
  const routeNavigator = useRouteNavigator();

  const openOrderOptionsPopout = () => {
    void routeNavigator.showPopout(
      <OrderOptionsPopout
        onCancelOrder={onCancelOrder}
        btnRef={btnMoreRef}
        copyLink={copyLink}
      />,
    );
  };

  const navigateToDish = (id: number) => {
    void routeNavigator.push(`/dish/${id}`);
  };

  return (
    <Group
      separator="auto"
      header={
        <Header
          aside={
            isDeliveryInProgress ? (
              <IconButton
                getRootRef={btnMoreRef}
                onClick={openOrderOptionsPopout}
                hasActive={false}
                hasHover={false}
              >
                <Icon20More className={styles.icon} />
              </IconButton>
            ) : (
              <Subhead weight="3" className={styles.subtitle}>
                #{orderId}
              </Subhead>
            )
          }
          subtitle={
            isDeliveryInProgress && (
              <Subhead weight="3" className={styles.subtitle}>
                #{orderId}
              </Subhead>
            )
          }
        >
          <Title level="3">Заказ</Title>
        </Header>
      }
    >
      <div className={styles.dishContainer}>
        <Dish
          dish={dish}
          extraOptions={parsedDishOptions}
          navigateToDish={navigateToDish}
        />
      </div>
    </Group>
  );
};

export default OrderDish;
