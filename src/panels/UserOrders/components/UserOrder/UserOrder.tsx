import { useMemo } from 'react';
import { Image, SimpleCell, classNames } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon24ChevronCompactRight } from '@vkontakte/icons';

import { parseOrderDate, getUserOrderStatusIcon } from 'helpers';
import { EOrderStatus } from 'panels/Order/consts';
import { TOrder } from 'panels/Order/types';

import styles from './UserOrder.module.css';

const UserOrder = ({ dish, date, status, id }: TOrder) => {
  const Icon = useMemo(() => getUserOrderStatusIcon(status), [status]);
  const routeNavigator = useRouteNavigator();

  const navigateToDish = () => {
    void routeNavigator.push(`/order-status/${id}`);
  };

  return (
    <SimpleCell
      onClick={navigateToDish}
      before={
        <>
          <Icon
            className={classNames({
              [styles.completedIcon]: status === EOrderStatus.COMPLETED,
              [styles.canceledIcon]: status === EOrderStatus.CANCELED,
            })}
          />
          <Image src={dish.small_img} size={72}></Image>
        </>
      }
      after={<Icon24ChevronCompactRight className={styles.chevronIcon} />}
      subtitle={parseOrderDate(new Date(date))}
    >
      {dish.name}
    </SimpleCell>
  );
};

export default UserOrder;
