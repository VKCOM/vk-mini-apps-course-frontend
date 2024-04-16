import { Group, Footer, classNames, Div } from '@vkontakte/vkui';

import { AppPanelSpinner, NetworkError } from 'components';
import { plural } from 'utils';
import { Achievement } from 'panels/Achievements/components';
import { TAchievement } from 'panels/Profile/types';

import styles from './PanelContent.module.css';

type Props = {
  isLoading: boolean;
  achievements: TAchievement[];
  hasOrderInProgress: boolean;
};

const PanelContent = ({
  isLoading,
  achievements,
  hasOrderInProgress,
}: Props) => {
  if (isLoading) {
    return <AppPanelSpinner />;
  }

  if (achievements.length === 0) {
    return <NetworkError />;
  }

  return (
    <Group mode="plain">
      <Div
        className={classNames(styles.container, {
          [styles.withBanner]: hasOrderInProgress,
        })}
      >
        {achievements.map((achievement) => {
          return <Achievement key={achievement.id} {...achievement} />;
        })}
      </Div>
      <Footer>
        {achievements.length}{' '}
        {plural(
          ['достижение', 'достижения', 'достижений'],
          achievements.length,
        )}
      </Footer>
    </Group>
  );
};

export default PanelContent;
