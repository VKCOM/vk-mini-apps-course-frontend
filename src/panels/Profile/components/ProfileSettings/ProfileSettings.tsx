import { useContext } from 'react';
import { parseURLSearchParamsForGetLaunchParams } from '@vkontakte/vk-bridge';
import { Group, SimpleCell, Switch } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
  Icon28ArticleOutline,
  Icon28VideoCircleOutline,
  Icon28ViewOutline,
  Icon24ChevronCompactRight,
  Icon28Notifications,
} from '@vkontakte/icons';

import { EModal } from 'consts/modals';
import { DataContext } from 'context/data';

import styles from './ProfileSettings.module.css';

const ProfileSettings = () => {
  const routeNavigator = useRouteNavigator();
  const { vk_are_notifications_enabled } =
    parseURLSearchParamsForGetLaunchParams(window.location.search);

  const dataContext = useContext(DataContext);
  const profile = dataContext?.data?.profile;

  const userId = profile?.id;
  const isOrdersPublic = profile?.is_orders_public;
  const isAdsEnabled = profile?.is_ads_enabled;
  const isAdsBtnDisabled = !isAdsEnabled || !profile?.is_donates_enabled;

  return (
    <Group mode="plain" separator="hide">
      <SimpleCell
        before={<Icon28Notifications />}
        after={
          <Switch checked={Boolean(vk_are_notifications_enabled)} disabled />
        }
      >
        Уведомления
      </SimpleCell>
      <SimpleCell
        before={<Icon28ArticleOutline />}
        after={<Icon24ChevronCompactRight className={styles.chevronIcon} />}
        subtitle="Стоимость, статусы, оценки"
        onClick={() => void routeNavigator.push(`/profile/${userId}/orders`)}
      >
        Все заказы
      </SimpleCell>
      <SimpleCell
        before={<Icon28VideoCircleOutline />}
        after={<Icon24ChevronCompactRight className={styles.chevronIcon} />}
        subtitle={isAdsEnabled ? 'Включена' : 'Выключена'}
        onClick={() =>
          void routeNavigator.push(`/profile/${userId}/ads_settings`)
        }
        disabled={isAdsBtnDisabled}
      >
        Реклама
      </SimpleCell>
      <SimpleCell
        before={<Icon28ViewOutline />}
        after={<Icon24ChevronCompactRight className={styles.chevronIcon} />}
        onClick={() =>
          void routeNavigator.showModal(EModal.CONFIRM_SHARE_ORDER)
        }
        subtitle={isOrdersPublic ? 'Включено' : 'Отключено'}
      >
        Отображение заказов
      </SimpleCell>
    </Group>
  );
};

export default ProfileSettings;
