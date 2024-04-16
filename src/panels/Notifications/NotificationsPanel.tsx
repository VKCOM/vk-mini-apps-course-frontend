import { useContext, useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelProps,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { OrderInProgress } from 'components';
import { normalizeError } from 'helpers';
import { getUserNotifications, markNotificationsAsViewed } from 'api/user';
import { DataContext } from 'context/data';
import { TNotification } from 'panels/Notifications/types';
import { PanelContent } from './components';

const NotificationsPanel = ({ id }: PanelProps) => {
  const routeNavigator = useRouteNavigator();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [notifications, setNotifications] = useState<TNotification[]>([]);

  const dataContext = useContext(DataContext);
  const profile = dataContext?.data?.profile;

  const loadNotifications = async () => {
    if (!profile) {
      return;
    }
    try {
      const fetchedNotifications = await getUserNotifications(profile.id);
      setNotifications(fetchedNotifications);
    } catch (e) {
      setError(normalizeError(e));
    } finally {
      setLoading(false);
      markNotificationsAsViewed(profile.id);
      dataContext.setData({
        ...dataContext.data,
        profile: {
          ...profile,
          notifications_count: 0,
        },
      });
    }
  };

  useEffect(() => {
    if (!profile || notifications.length || error) {
      return;
    }

    loadNotifications();
  }, [profile, notifications, error]);

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
        Уведомления
      </PanelHeader>
      <OrderInProgress />
      <PanelContent
        isLoading={isLoading}
        error={error}
        notifications={notifications}
        loadNotifications={loadNotifications}
      />
    </Panel>
  );
};

export default NotificationsPanel;
