import { useEffect, useContext } from 'react';

import { getUserActiveOrder } from 'api/user';
import { DataContext } from 'context/data';

export const useGetUserActiveOrder = () => {
  const dataContext = useContext(DataContext);
  const profile = dataContext?.data?.profile;
  const orderInProgress = dataContext?.data?.orderInProgress;

  useEffect(() => {
    if (!profile || orderInProgress !== undefined) {
      return;
    }

    const loadActiveOrder = async () => {
      try {
        const fetchedOrder = await getUserActiveOrder(profile.id);

        dataContext.setData({
          ...dataContext.data,
          orderInProgress: fetchedOrder ? fetchedOrder : null,
        });
      } catch (e) {
        console.log('Ошибка получения активного заказа пользователя:', e);
      }
    };
    loadActiveOrder();
  }, [profile, orderInProgress]);
};
