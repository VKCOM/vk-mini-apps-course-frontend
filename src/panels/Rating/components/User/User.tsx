import { useContext } from 'react';
import {
  Avatar,
  SimpleCell,
  Footnote,
  Counter,
  Headline,
} from '@vkontakte/vkui';
import { Icon24InfoCircleOutline } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { joinWithDots, compatibilityValue } from 'helpers';
import { plural } from 'utils';
import { DataContext } from 'context/data';
import { TUser } from 'panels/Rating/types';

import styles from './User.module.css';

type Props = {
  user: TUser;
  index: number;
};

const User = ({ user, index }: Props) => {
  const {
    last_name,
    compatibility,
    lvl,
    first_name,
    photo_200,
    orders_count,
    id,
  } = user;
  const dataContext = useContext(DataContext);
  const ownerId = dataContext?.data?.profile?.id || 0;
  const routeNavigator = useRouteNavigator();

  const handleInfoBtnClick = () => {
    if (id === ownerId) {
      return;
    }

    void routeNavigator.push(`/user-card/${id}`, { keepSearchParams: true });
  };

  return (
    <SimpleCell
      onClick={handleInfoBtnClick}
      className={styles.cell}
      hasActive={false}
      hasHover={false}
      before={
        <Avatar size={72} src={photo_200}>
          <Avatar.Badge>
            <Counter className={styles.counter}>{index}</Counter>
          </Avatar.Badge>
        </Avatar>
      }
      after={
        id === ownerId ? (
          <Headline level="1" className={styles.infoIcon}>
            Это вы
          </Headline>
        ) : (
          <Icon24InfoCircleOutline className={styles.infoIcon} />
        )
      }
      subtitle={joinWithDots(
        `${lvl} уровень`,
        `${orders_count} ${plural(
          ['заказ', 'заказа', 'заказов'],
          orders_count,
        )}`,
      )}
      extraSubtitle={
        id !== ownerId && (
          <Footnote weight="3" className={styles.extraSubtitle}>
            {compatibilityValue(compatibility)}
          </Footnote>
        )
      }
    >
      {first_name} {last_name}
    </SimpleCell>
  );
};

export default User;
