import {
  Placeholder,
  Text,
  Avatar,
  ButtonGroup,
  Button,
} from '@vkontakte/vkui';

import { compatibilityValue } from 'helpers';
import { TUser } from 'panels/Rating/types';

import styles from './UserInfo.module.css';
import { plural } from 'utils';

const UserInfo = ({
  id,
  first_name,
  last_name,
  photo_200,
  lvl,
  orders_count,
  compatibility,
  is_friend,
}: TUser) => {
  const fullName = `${first_name} ${last_name}`;

  return (
    <Placeholder
      icon={<Avatar src={photo_200} size={72} />}
      header={fullName}
      noPadding
      action={
        <ButtonGroup stretched>
          {!is_friend && (
            <Button
              mode="primary"
              stretched
              size="m"
              href={`https://vk.com/id${id}`}
              target="_blank"
            >
              Перейти в профиль
            </Button>
          )}
          <Button
            mode={is_friend ? 'primary' : 'secondary'}
            size="m"
            href={`https://vk.com/im?sel=${id}`}
            target="_blank"
          >
            Написать
          </Button>
        </ButtonGroup>
      }
    >
      <Text weight="3" className={styles.subtitle}>
        {lvl} уровень <br />
        {orders_count} {plural(['заказ', 'заказа', 'заказов'], orders_count)}{' '}
        {plural(['завершен', 'завершено', 'завершено'], orders_count)}
      </Text>
      <Text weight="3" className={styles.extraSubtitle}>
        {compatibilityValue(compatibility)}
      </Text>
    </Placeholder>
  );
};

export default UserInfo;
