import { Group, Title, Footer, Footnote } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { plural } from 'utils';
import { Dish } from 'panels/Dishes/components';
import { TOrder } from 'panels/Order/types';

import styles from './UserOrders.module.css';

type Props = {
  orders: TOrder[];
};

const UserOrders = ({ orders }: Props) => {
  const routeNavigator = useRouteNavigator();

  const navigateToDish = (id: number) =>
    void routeNavigator.push(`/dish/${id}`);

  return (
    <Group
      header={
        <Title level="3" className={styles.title}>
          Заказы{' '}
          <Footnote className={styles.ordersLength}>{orders.length}</Footnote>
        </Title>
      }
      mode="plain"
      className={styles.userOrders}
    >
      {orders.map((order) => (
        <Dish
          dish={order.dish}
          navigateToDish={() => navigateToDish(order.dish.id)}
          key={order.id}
        />
      ))}
      <Footer>
        {orders.length} {plural(['заказ', 'заказа', 'заказов'], orders.length)}
      </Footer>
    </Group>
  );
};

export default UserOrders;
