import { useContext, useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  PanelProps,
  useAdaptivityConditionalRender,
  Platform,
  usePlatform,
} from '@vkontakte/vkui';

import { OrderInProgress } from 'components';
import { DataContext } from 'context/data';
import { NotificationButton } from 'panels/Profile/components';

import { TProfile } from './types';
import { PanelContent } from './components';

const ProfilePanel = ({ id }: PanelProps) => {
  const [profile, setProfile] = useState<TProfile | null>(null);
  const [isLoading, setLoading] = useState(true);

  const { sizeX } = useAdaptivityConditionalRender();
  const platform = usePlatform();
  const isMobile =
    sizeX.compact &&
    (platform === Platform.ANDROID || platform === Platform.IOS);

  const dataContext = useContext(DataContext);
  const orderInProgress = dataContext?.data?.orderInProgress;
  const contextProfile = dataContext?.data?.profile;

  useEffect(() => {
    if (!contextProfile) {
      return;
    }

    setProfile(contextProfile);
    setLoading(false);
  }, [contextProfile]);

  return (
    <Panel id={id}>
      <PanelHeader
        fixed
        before={
          isMobile && (
            <NotificationButton
              userId={profile?.id}
              notifications_count={profile?.notifications_count}
            />
          )
        }
      >
        Блюдо дня
      </PanelHeader>
      <OrderInProgress />
      <PanelContent
        isLoading={isLoading}
        profile={profile}
        hasOrderInProgress={Boolean(orderInProgress)}
      />
    </Panel>
  );
};

export default ProfilePanel;
