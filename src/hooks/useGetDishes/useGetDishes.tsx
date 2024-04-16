import { useEffect, useContext, useState } from 'react';

import { normalizeError } from 'helpers';
import { getDishes } from 'api/dishes';
import { DataContext } from 'context/data';

export const useGetDishes = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const dataContext = useContext(DataContext);
  const profile = dataContext?.data?.profile;
  const orderInProgress = dataContext?.data?.orderInProgress;
  const dishes = dataContext?.data?.dishes;

  const loadDishes = async () => {
    try {
      const fetchedDishes = await getDishes();

      if (!dataContext || !fetchedDishes) {
        return;
      }

      dataContext.setData({
        ...dataContext.data,
        dishes: fetchedDishes,
      });
    } catch (e) {
      setError(normalizeError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dishes) {
      setLoading(false);
      return;
    }
    if (!profile || orderInProgress === undefined) {
      return;
    }
    loadDishes();
  }, [profile, orderInProgress, dishes]);

  return {
    isLoading,
    error,
    loadDishes,
  };
};
