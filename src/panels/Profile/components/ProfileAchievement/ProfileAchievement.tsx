import { HorizontalCell } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import {
  AchievementImage,
  AchievementsSharePopout,
} from 'panels/Achievements/components';
import { TAchievement } from 'panels/Profile/types';

import styles from './ProfileAchievement.module.css';

const ProfileAchievement = ({
  title,
  img,
  activated,
  story_img,
}: TAchievement) => {
  const routeNavigator = useRouteNavigator();

  const openAchievementsShare = () =>
    void routeNavigator.showPopout(
      <AchievementsSharePopout storyImg={story_img} />,
    );

  return (
    <HorizontalCell
      size="m"
      header={<div className={styles.subhead}>{title}</div>}
      onClick={openAchievementsShare}
      disabled={!activated}
    >
      <AchievementImage url={img} isDisabled={!activated} />
    </HorizontalCell>
  );
};

export default ProfileAchievement;
