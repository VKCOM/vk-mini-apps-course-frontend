import { useContext } from 'react';
import { Group, Header, Div } from '@vkontakte/vkui';

import { OrderBanner } from 'components';
import { DataContext } from 'context/data';
import { EOrderStatus } from 'panels/Order/consts';
import { TOrder } from 'panels/Order/types';
import { UserOrder } from 'panels/UserOrders/components';

import styles from './UserOrdersList.module.css';

type Props = {
  orders: TOrder[];
};

const UserOrdersList = ({ orders }: Props) => {
  const dataContext = useContext(DataContext);
  const completedOrders = orders.filter(
    (order) =>
      order.status === EOrderStatus.COMPLETED ||
      order.status === EOrderStatus.CANCELED,
  );
  const orderInProgress = dataContext?.data?.orderInProgress;

  return (
    <>
      {orderInProgress && (
        <Group
          separator="hide"
          mode="plain"
          header={
            <Header mode="primary" indicator="1">
              Активные заказы
            </Header>
          }
        >
          <Div>
            <OrderBanner {...orderInProgress} />
          </Div>
        </Group>
      )}
      <Group
        mode="plain"
        className={styles.completedOrders}
        header={
          <Header mode="primary" indicator={completedOrders.length}>
            Завершенные
          </Header>
        }
      >
        {completedOrders.map((order) => (
          <UserOrder {...order} key={order.id} />
        ))}
      </Group>
    </>
  );
};

export default UserOrdersList;
