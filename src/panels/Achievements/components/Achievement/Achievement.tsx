import { SimpleCell } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import {
  AchievementImage,
  AchievementsSharePopout,
} from 'panels/Achievements/components';
import { TAchievement } from 'panels/Profile/types';

import styles from './Achievement.module.css';

const Achievement = ({ title, img, activated, story_img }: TAchievement) => {
  const routeNavigator = useRouteNavigator();

  const openAchievementsShare = () =>
    void routeNavigator.showPopout(
      <AchievementsSharePopout storyImg={story_img} />,
    );

  return (
    <SimpleCell
      multiline
      className={styles.baseCell}
      disabled={!activated}
      onClick={openAchievementsShare}
    >
      <div className={styles.content}>
        <AchievementImage url={img} isDisabled={!activated} />
        <div className={styles.subhead}>{title}</div>
      </div>
    </SimpleCell>
  );
};

export default Achievement;
