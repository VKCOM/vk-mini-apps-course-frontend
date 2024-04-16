import { FC, useMemo } from 'react';
import { Image, RichCell, Button, classNames } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { getOrderStatusIcon, shareAchievment } from 'helpers';
import { TNotification, EActionType } from 'panels/Notifications/types';
import { EOrderStatus } from 'panels/Order/consts';

import styles from './Notification.module.css';

const Notification: FC<TNotification> = ({
  img,
  title,
  text,
  action,
  status,
}) => {
  const routeNavigator = useRouteNavigator();
  const Icon = useMemo(() => getOrderStatusIcon(status), [status]);

  const notificationAction = () => {
    if (action?.type === EActionType.SHARE && action.share_image) {
      shareAchievment(action.share_image);
    } else if (action?.type === EActionType.ORDER && action.order_id) {
      void routeNavigator.push(`/order-status/${action.order_id}`);
    }
  };

  return (
    <RichCell
      before={<Image src={img} size={48}></Image>}
      disabled
      after={
        status && (
          <Icon
            className={classNames({
              [styles.completedIcon]: status === EOrderStatus.SUCCESS,
              [styles.canceledIcon]: status === EOrderStatus.FAILED,
            })}
          />
        )
      }
      caption={text}
      actions={
        action && (
          <Button mode="secondary" size="s" onClick={notificationAction}>
            {action.title}
          </Button>
        )
      }
    >
      {title}
    </RichCell>
  );
};

export default Notification;
