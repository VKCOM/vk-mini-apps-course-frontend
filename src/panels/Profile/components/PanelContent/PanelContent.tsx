import { Spacing, classNames } from '@vkontakte/vkui';

import { AppPanelSpinner, NetworkError } from 'components';
import {
  ProfileInfo,
  ProfileAchievements,
  ProfileSettings,
} from 'panels/Profile/components';
import { TProfile } from 'panels/Profile/types';

import styles from './PanelContent.module.css';

type Props = {
  isLoading: boolean;
  profile: TProfile | null;
  hasOrderInProgress: boolean;
};

const PanelContent = ({ isLoading, profile, hasOrderInProgress }: Props) => {
  if (isLoading) {
    return <AppPanelSpinner />;
  }

  if (!profile) {
    return <NetworkError />;
  }

  return (
    <div
      className={classNames(styles.container, {
        [styles.withBanner]: hasOrderInProgress,
      })}
    >
      <Spacing size={8} />
      <ProfileInfo {...profile} />
      {Boolean(profile.achievements.length) && (
        <>
          <ProfileAchievements
            achievements={profile.achievements}
            userId={profile.id}
          />
          <Spacing size={8} />
        </>
      )}
      <ProfileSettings />
    </div>
  );
};

export default PanelContent;
