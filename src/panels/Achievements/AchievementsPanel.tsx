import { useContext, useState, useEffect } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelProps,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { OrderInProgress } from 'components';
import { DataContext } from 'context/data';
import { TAchievement } from 'panels/Profile/types';
import { PanelContent } from './components';

const AchievementsPanel = ({ id }: PanelProps) => {
  const routeNavigator = useRouteNavigator();
  const [isLoading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<TAchievement[]>([]);

  const dataContext = useContext(DataContext);
  const orderInProgress = dataContext?.data?.orderInProgress;
  const profile = dataContext?.data?.profile;

  useEffect(() => {
    if (!profile) {
      return;
    }

    setAchievements(profile.achievements);
    setLoading(false);
  }, [profile]);

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
        Достижения
      </PanelHeader>
      <OrderInProgress />
      <PanelContent
        isLoading={isLoading}
        achievements={achievements}
        hasOrderInProgress={Boolean(orderInProgress)}
      />
    </Panel>
  );
};

export default AchievementsPanel;
