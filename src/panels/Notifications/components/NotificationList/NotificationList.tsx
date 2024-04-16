import { useContext } from 'react';
import { Group, Header, classNames } from '@vkontakte/vkui';

import { DataContext } from 'context/data';
import { Notification } from 'panels/Notifications/components';
import { TNotification } from 'panels/Notifications/types';

import styles from './NotificationList.module.css';

type Props = {
  notifications: TNotification[];
};

const NotificationList = ({ notifications }: Props) => {
  const dataContext = useContext(DataContext);
  const orderInProgress = dataContext?.data?.orderInProgress;

  const newNotifications = notifications.filter(
    (notification) => !notification.is_viewed,
  );
  const oldNotifications = notifications.filter(
    (notification) => notification.is_viewed,
  );

  return (
    <div
      className={classNames(styles.container, {
        [styles.withBanner]: Boolean(orderInProgress),
      })}
    >
      {newNotifications.length > 0 && (
        <Group
          mode="plain"
          header={<Header mode="secondary">Новые</Header>}
          separator="hide"
        >
          {newNotifications.map((notification) => (
            <Notification {...notification} key={notification.id} />
          ))}
        </Group>
      )}
      {oldNotifications.length > 0 && (
        <Group
          mode="plain"
          header={<Header mode="secondary">Просмотренные</Header>}
          separator="hide"
        >
          {oldNotifications.map((notification) => (
            <Notification {...notification} key={notification.id} />
          ))}
        </Group>
      )}
    </div>
  );
};

export default NotificationList;
