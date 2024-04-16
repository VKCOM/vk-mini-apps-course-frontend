import { Header, HorizontalScroll, Group } from '@vkontakte/vkui';
import { RouterLink } from '@vkontakte/vk-mini-apps-router';

import { ProfileAchievement } from 'panels/Profile/components';
import { TAchievement } from 'panels/Profile/types';

import styles from './ProfileAchievements.module.css';

type Props = {
  achievements: TAchievement[];
  userId: number;
};

const ProfileAchievements = ({ achievements, userId }: Props) => (
  <Group
    mode="plain"
    separator="hide"
    header={
      <Header
        mode="primary"
        /* Модуль 4. Разработка Урок 3. Роутинг #M4L3. Использование RouterLink */
        aside={
          <RouterLink to={`/profile/${userId}/achievements`}>
            Показать все
          </RouterLink>
        }
      >
        Достижения
      </Header>
    }
  >
    <HorizontalScroll
      getScrollToLeft={(i) => i - 120}
      getScrollToRight={(i) => i + 120}
    >
      <div className={styles.container}>
        {achievements.map((achievement) => {
          return <ProfileAchievement key={achievement.id} {...achievement} />;
        })}
      </div>
    </HorizontalScroll>
  </Group>
);

export default ProfileAchievements;
