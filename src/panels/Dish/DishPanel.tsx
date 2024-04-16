import { useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelProps,
} from '@vkontakte/vkui';
import {
  useRouteNavigator,
  useFirstPageCheck,
  useParams,
  useMetaParams,
} from '@vkontakte/vk-mini-apps-router';

import { OrderInProgress } from 'components';
import { normalizeError } from 'helpers';
import { getDish } from 'api/dishes';
import { TDish } from 'panels/Dishes/types';
import { PanelContent } from './components';

const DishPanel = ({ id }: PanelProps) => {
  const routeNavigator = useRouteNavigator();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [dish, setDish] = useState<TDish | null>(null);
  /* Модуль 4. Разработка Урок 3. Роутинг #M4L3. Получение path-параметров с помощью useParams */
  const params = useParams<'id'>();
  const dishId = params?.id;
  const isFirstPage = useFirstPageCheck();
  const metaParams = useMetaParams<{ from: string }>();

  /*
    Модуль 4. Разработка Урок 8. Работа с внешним API #M4L8.
    Пример реализации работы с сервером.
  */
  const loadDish = async () => {
    try {
      const fetchedDish = await getDish(Number(dishId));
      setDish(fetchedDish);
    } catch (e) {
      setError(normalizeError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!dishId) {
      return;
    }

    loadDish();
  }, [dishId]);

  const handleBtnBackClick = () => {
    if (metaParams?.from === 'order' || isFirstPage) {
      void routeNavigator.replace('/');
    } else {
      void routeNavigator.back();
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader
        delimiter="none"
        fixed
        before={<PanelHeaderBack onClick={handleBtnBackClick} />}
      />
      <OrderInProgress />
      <PanelContent
        isLoading={isLoading}
        dish={dish}
        error={error}
        loadDish={loadDish}
      />
    </Panel>
  );
};

export default DishPanel;
