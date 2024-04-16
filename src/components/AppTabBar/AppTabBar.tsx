import { Tabbar, TabbarItem, Badge } from '@vkontakte/vkui';
import {
  Icon28CupOutline,
  Icon28ChefHatOutline,
  Icon28UserCircleOutline,
} from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { useHasNotificationsCount } from 'hooks';
import { EView } from 'consts/views';

type Props = {
  activeStory: EView;
  isHidden: boolean;
};

/*
  Модуль 4. Разработка Урок 2. Знакомство с VKUI #M4L2.
  Tabbar и TabbarItem.
*/
const AppTabBar = ({ activeStory, isHidden }: Props) => {
  const routeNavigator = useRouteNavigator();
  const hasNotifications = useHasNotificationsCount();

  return (
    <Tabbar hidden={isHidden}>
      <TabbarItem
        onClick={() => void routeNavigator.push('/rating')}
        selected={activeStory === EView.RATING}
        data-story={EView.RATING}
        text="Рейтинг"
      >
        <Icon28CupOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => void routeNavigator.push('/')}
        selected={activeStory === EView.DISHES}
        data-story={EView.DISHES}
        text="Блюда"
      >
        <Icon28ChefHatOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => void routeNavigator.push('/profile')}
        selected={activeStory === EView.PROFILE}
        data-story={EView.PROFILE}
        indicator={
          hasNotifications && (
            <Badge mode="prominent" aria-label="Новые уведомления" />
          )
        }
        text="Профиль"
      >
        <Icon28UserCircleOutline />
      </TabbarItem>
    </Tabbar>
  );
};

export default AppTabBar;
