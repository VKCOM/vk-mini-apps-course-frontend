import { PanelHeaderButton, Counter } from '@vkontakte/vkui';
import { Icon28Notifications } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

type Props = {
  userId: number | undefined;
  notifications_count: number | undefined;
};

const NotificationButton = ({ userId, notifications_count }: Props) => {
  const routeNavigator = useRouteNavigator();

  return (
    <PanelHeaderButton
      aria-label="Уведомления"
      onClick={() =>
        void routeNavigator.push(`/profile/${userId}/notifications`)
      }
      label={
        Boolean(notifications_count) && (
          <Counter size="s" mode="prominent" aria-label="Уведомлений: ">
            {notifications_count}
          </Counter>
        )
      }
    >
      <Icon28Notifications />
    </PanelHeaderButton>
  );
};

export default NotificationButton;
