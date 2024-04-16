import { PopoutWrapper, CellButton, Separator, Card } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
  Icon28ArrowUturnRightOutline,
  Icon28StoryOutline,
} from '@vkontakte/icons';

import { shareAchievment, sharePostInWall } from 'helpers';

import styles from './AchievementsSharePopout.module.css';

type Props = {
  storyImg: string;
};

const AchievementsSharePopout = ({ storyImg }: Props) => {
  const routeNavigator = useRouteNavigator();

  const onCancel = () => {
    routeNavigator.hidePopout();
  };

  return (
    <PopoutWrapper alignY="bottom" onClickCapture={onCancel}>
      <div className={styles.shareOptionsPopout}>
        <Card>
          <CellButton
            onClick={sharePostInWall}
            before={<Icon28ArrowUturnRightOutline />}
          >
            На своей странице
          </CellButton>
          <Separator />
          <CellButton
            onClick={() => shareAchievment(storyImg)}
            before={<Icon28StoryOutline />}
          >
            Поделиться в истории
          </CellButton>
        </Card>

        <Card>
          <CellButton centered onClick={onCancel}>
            Отмена
          </CellButton>
        </Card>
      </div>
    </PopoutWrapper>
  );
};

export default AchievementsSharePopout;
