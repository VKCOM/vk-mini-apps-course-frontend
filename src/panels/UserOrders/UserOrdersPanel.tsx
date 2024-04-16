import { useContext, useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelProps,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { normalizeError } from 'helpers';
import { getUserOrders } from 'api/user';
import { DataContext } from 'context/data';
import { TOrder } from 'panels/Order/types';

import { PanelContent } from './components';

const UserOrdersPanel = ({ id }: PanelProps) => {
  const routeNavigator = useRouteNavigator();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [orders, setOrders] = useState<TOrder[]>([]);

  const dataContext = useContext(DataContext);
  const profile = dataContext?.data?.profile;

  const loadOrders = async () => {
    if (!profile) {
      return;
    }
    try {
      const fetchedOrders = await getUserOrders(profile.id);
      setOrders(fetchedOrders);
    } catch (e) {
      setError(normalizeError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!profile) {
      return;
    }

    loadOrders();
  }, [profile]);

  return (
    <Panel id={id}>
      <PanelHeader
        fixed
        before={
          <PanelHeaderBack
            onClick={() => void routeNavigator.replace('/profile')}
          />
        }
      >
        Все заказы
      </PanelHeader>
      <PanelContent
        isLoading={isLoading}
        error={error}
        orders={orders}
        loadOrders={loadOrders}
      />
    </Panel>
  );
};

export default UserOrdersPanel;
