import { useContext, useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelProps,
} from '@vkontakte/vkui';
import { useRouteNavigator, useParams } from '@vkontakte/vk-mini-apps-router';

import { normalizeError } from 'helpers';
import { getOrder } from 'api/orders';
import { DataContext } from 'context/data';
import { EOrderStatus } from 'panels/Order/consts';
import { OrderCancelPopout, PanelContent } from 'panels/Order/components';
import { TOrder } from 'panels/Order/types';

const OrderPanel = ({ id }: PanelProps) => {
  const routeNavigator = useRouteNavigator();
  const [order, setOrder] = useState<TOrder | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const params = useParams<'id'>();
  const orderId = params?.id;
  const dataContext = useContext(DataContext);
  const orderInProgress = dataContext?.data?.orderInProgress;
  const currentAddress = dataContext?.data?.address;

  const loadOrder = async () => {
    if (orderInProgress?.id === Number(orderId)) {
      setOrder(orderInProgress);
      setLoading(false);
      return;
    }

    try {
      const fetchedOrder = await getOrder(Number(orderId));
      setOrder(fetchedOrder);
      const isOrderFinished =
        fetchedOrder.status === EOrderStatus.COMPLETED ||
        fetchedOrder.status === EOrderStatus.CANCELED;
      dataContext?.setData({
        ...dataContext.data,
        orderInProgress: isOrderFinished ? null : fetchedOrder,
      });
    } catch (e) {
      setError(normalizeError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!orderId || orderInProgress === undefined) {
      return;
    }

    loadOrder();
  }, [orderId, orderInProgress]);

  const navigateToDish = () => {
    void routeNavigator.push(`/dish/${order?.dish.id}`, {
      state: { from: 'order' },
    });
  };

  /*
    Модуль 4. Разработка Урок 4. Модальные окна #M4L4.
    Отображение модального окна.
  */
  const showPopout = () => {
    void routeNavigator.showPopout(
      <OrderCancelPopout handleBackButton={navigateToDish} />,
    );
  };

  const handleButton = () => {
    if (!order) {
      void routeNavigator.push('/');
    } else if (
      order?.status === EOrderStatus.COMPLETED ||
      order?.status === EOrderStatus.CANCELED
    ) {
      navigateToDish();
    } else {
      showPopout();
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader fixed before={<PanelHeaderBack onClick={handleButton} />}>
        Заказ
      </PanelHeader>
      <PanelContent
        isLoading={isLoading}
        error={error}
        order={order}
        currentAddress={currentAddress}
        loadOrder={loadOrder}
      />
    </Panel>
  );
};

export default OrderPanel;
