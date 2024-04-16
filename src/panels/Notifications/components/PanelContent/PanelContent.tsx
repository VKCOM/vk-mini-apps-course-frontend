import { AppPanelSpinner, NetworkError } from 'components';
import {
  NotificationList,
  EmptyNotifications,
} from 'panels/Notifications/components';
import { TNotification } from 'panels/Notifications/types';

type Props = {
  isLoading: boolean;
  error: Error | null;
  notifications: TNotification[];
  loadNotifications: () => void;
};

const PanelContent = ({
  isLoading,
  error,
  notifications,
  loadNotifications,
}: Props) => {
  if (isLoading) {
    return <AppPanelSpinner />;
  }

  if (error) {
    return <NetworkError action={loadNotifications} />;
  }

  if (!notifications.length) {
    return <EmptyNotifications />;
  }

  return <NotificationList notifications={notifications} />;
};

export default PanelContent;
