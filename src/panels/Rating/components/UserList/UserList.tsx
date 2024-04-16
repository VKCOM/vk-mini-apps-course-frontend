import { Group, Spacing } from '@vkontakte/vkui';

import { User } from 'panels/Rating/components';
import { TUser } from 'panels/Rating/types';

import styles from './UserList.module.css';

type Props = {
  users: TUser[] | undefined;
};

const UserList = ({ users }: Props) => {
  if (!users) {
    return null;
  }

  return (
    <Group mode="plain" separator="hide" className={styles.container}>
      <Spacing size={48} />
      {users.map((user, i) => (
        <User user={user} key={user.id} index={i + 1} />
      ))}
    </Group>
  );
};

export default UserList;
