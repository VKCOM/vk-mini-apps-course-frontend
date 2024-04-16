import { useEffect, useState, useContext } from 'react';
import bridge from '@vkontakte/vk-bridge';

import { normalizeError } from 'helpers';
import { getPaymentProducts } from 'api/payments';
import { getUser } from 'api/user';
import { DataContext } from 'context/data';

export const useProfile = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const dataContext = useContext(DataContext);
  const profile = dataContext?.data?.profile;

  const loadUserInfo = async () => {
    if (profile) {
      setLoading(false);
      return;
    }

    try {
      const userInfo = await bridge.send('VKWebAppGetUserInfo');
      const fetchedUser = await getUser(userInfo.id);
      let fetchedDonateProducts = null;

      if (fetchedUser.is_donates_enabled && fetchedUser.is_ads_enabled) {
        fetchedDonateProducts = await getPaymentProducts();
      }

      dataContext?.setData({
        ...dataContext.data,
        profile: {
          ...fetchedUser,
          ...userInfo,
          donateProducts: fetchedDonateProducts,
        },
      });
    } catch (e) {
      setError(normalizeError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  return {
    isLoading,
    error,
  };
};
