import { useEffect, useState, useContext } from 'react';
import {
  ModalPageHeader,
  Div,
  useModalRootContext,
  Spinner,
} from '@vkontakte/vkui';
import { useParams } from '@vkontakte/vk-mini-apps-router';

import { AppModalCloseBtn, NetworkError } from 'components';
import { getUserOrders } from 'api/user';
import { DataContext } from 'context/data';
import { TOrder } from 'panels/Order/types';
import { UserInfo, UserOrders } from 'panels/Rating/components';
import { TUser } from 'panels/Rating/types';

import styles from './UserModal.module.css';

type Props = {
  onClose: () => void;
};

const UserModal = ({ onClose }: Props) => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setLoading] = useState(true);
  const { updateModalHeight } = useModalRootContext();

  const dataContext = useContext(DataContext);
  const isOrdersPublic = dataContext?.data?.profile?.is_orders_public;
  const users = dataContext?.data?.users;

  const params = useParams<'id'>();
  const userId = params?.id;
  updateModalHeight();

  const loadOrders = async () => {
    setLoading(true);
    try {
      const fetchedOrders = await getUserOrders(Number(userId));
      setOrders(fetchedOrders);
    } catch (e) {
      console.log('Ошибка получения заказов пользователя:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId || !users) {
      return;
    }

    const user = users?.find((user) => user.id === Number(userId));

    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, [userId, users]);

  useEffect(() => {
    if (!userId || !user) {
      return;
    }

    if (!user.is_orders_public || !isOrdersPublic) {
      setLoading(false);
      return;
    }

    loadOrders();
  }, [user, isOrdersPublic, userId]);

  if (isLoading) {
    return (
      <div className={styles.emptyModal}>
        <Spinner size="medium" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.emptyModal}>
        <NetworkError />
      </div>
    );
  }

  return (
    <>
      <ModalPageHeader
        float={true}
        after={<AppModalCloseBtn onClose={onClose} />}
      />
      <Div>
        <UserInfo {...user} />
        {orders.length > 0 && <UserOrders orders={orders} />}
      </Div>
    </>
  );
};

export default UserModal;
