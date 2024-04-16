import { useContext } from 'react';

import { DataContext } from 'context/data';

export const useHasNotificationsCount = () => {
  const dataContext = useContext(DataContext);
  const hasNotificationsCount = dataContext?.data?.profile?.notifications_count;

  return Boolean(hasNotificationsCount);
};
