import { useContext, useEffect } from 'react';
import { View, Epic, SplitLayout, SplitCol, classNames } from '@vkontakte/vkui';
import {
  useActiveVkuiLocation,
  usePopout,
} from '@vkontakte/vk-mini-apps-router';
import '@vkontakte/vkui/dist/vkui.css';

import { AppTabBar, AppModalRoot } from 'components';
import { enableSwipe, showBannerAds } from 'helpers';
import { useOnboardSlides, useProfile, useGetUserActiveOrder } from 'hooks';
import { EPanel } from 'consts/panels';
import { EView } from 'consts/views';
import { DataContext } from 'context/data';
import AchievementsPanel from 'panels/Achievements/AchievementsPanel';
import DishPanel from 'panels/Dish/DishPanel';
import DishesPanel from 'panels/Dishes/DishesPanel';
import NotificationsPanel from 'panels/Notifications/NotificationsPanel';
import OrderPanel from 'panels/Order/OrderPanel';
import ProfilePanel from 'panels/Profile/ProfilePanel';
import RatingPanel from 'panels/Rating/RatingPanel';
import UserOrdersPanel from 'panels/UserOrders/UserOrdersPanel';

import styles from './App.module.css';

const App = () => {
  /* Модуль 4. Разработка Урок 3. Роутинг #M4L3. Получение view и panel */
  const { view: activeView, panel: activePanel = EPanel.DISHES } =
    useActiveVkuiLocation();
  const routerPopout = usePopout();
  const dataContext = useContext(DataContext);
  const profile = dataContext?.data?.profile;
  const isPaddingNeeded = profile?.is_ads_enabled;

  useOnboardSlides();
  useProfile();
  enableSwipe();
  useGetUserActiveOrder();

  useEffect(() => {
    if (!profile?.is_ads_enabled) {
      return;
    }

    showBannerAds();
  }, [profile]);

  /*
    Модуль 4. Разработка Урок 2. Знакомство с VKUI #M4L2.
    Структура приложения.
  */
  return (
    <SplitLayout modal={<AppModalRoot />} popout={routerPopout}>
      <SplitCol
        className={classNames(styles.col, {
          [styles.colWithPadding]: isPaddingNeeded,
        })}
      >
        <Epic
          activeStory={activeView ?? EView.DISHES}
          tabbar={
            <AppTabBar
              activeStory={activeView as EView}
              isHidden={activePanel === EPanel.DISH}
            />
          }
        >
          <View id={EView.DISHES} activePanel={activePanel}>
            <DishesPanel id={EPanel.DISHES} />
            <DishPanel id={EPanel.DISH} />
            <OrderPanel id={EPanel.ORDER} />
          </View>
          <View id={EView.PROFILE} activePanel={activePanel}>
            <ProfilePanel id={EPanel.PROFILE} />
            <AchievementsPanel id={EPanel.ACHIEVEMENTS} />
            <UserOrdersPanel id={EPanel.USER_ORDERS} />
            <NotificationsPanel id={EPanel.NOTIFICATIONS} />
          </View>
          <View id={EView.RATING} activePanel={activePanel}>
            <RatingPanel id={EPanel.RATING} />
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};

export default App;
