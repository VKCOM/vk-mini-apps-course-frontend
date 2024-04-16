import { Placeholder } from '@vkontakte/vkui';
import { Icon56NotificationOutline } from '@vkontakte/icons';

const EmptyNotifications = () => (
  <Placeholder stretched icon={<Icon56NotificationOutline />}>
    Пока нет уведомлений
  </Placeholder>
);

export default EmptyNotifications;
