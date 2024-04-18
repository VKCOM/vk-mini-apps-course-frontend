import { useState, useEffect, useContext } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';

import { vkApiFetch, normalizeError } from 'helpers';
import { getUsersList } from 'api/user';
import { DataContext } from 'context/data';
import { ETab } from 'panels/Rating/consts';
import { TUserFromBack, TUser } from 'panels/Rating/types';

export const useGetFriends = (tab: ETab | null) => {
  const [storedUsers, setStoredUsers] = useState<TUser[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const dataContext = useContext(DataContext);
  const profile = dataContext?.data?.profile;
  const users = dataContext?.data?.users;

  const getFriends = async () => {
    try {
      const data = await vkApiFetch('friends.get', { fields: 'photo_200' });
      const friends = data.response.items.map((item: UserInfo) => item.id);
      const fetchedUsersResult = await getUsersList([]);

      if (fetchedUsersResult.length > 0) {
        const usersFromBack: { [index: number]: {} } = {};
        fetchedUsersResult.forEach((user: TUserFromBack) => {
          usersFromBack[user.id] = user;
        });

        const usersInfo = await bridge.send('VKWebAppGetUserInfo', {
          // @ts-expect-error TS2322: user_ids didnt describe in VKWebAppGetUserInfo docs
          user_ids: Object.keys(usersFromBack).join(','),
        });
        // @ts-expect-error TS2322: result didnt describe in VKWebAppGetUserInfo docs
        const usersFromBridge = usersInfo.result
          ? // @ts-expect-error TS2322:
            [...usersInfo.result]
          : [usersInfo];

        // @ts-expect-error TS2322: return type didnt describe in VKWebAppGetUserInfo docs
        const users: TUser[] = usersFromBridge.map((user: UserInfo) => ({
          is_friend: Array.isArray(friends) ? friends.includes(user.id) : false,
          first_name: user.first_name,
          last_name: user.last_name,
          photo_200: user.photo_200,
          ...usersFromBack[user.id],
        }));
        const sortedUsersByLvl = users.sort((u1, u2) => u2.lvl - u1.lvl);
        setStoredUsers(sortedUsersByLvl);

        dataContext?.setData({
          ...dataContext.data,
          users: sortedUsersByLvl,
        });
      } else {
        setStoredUsers([]);
      }
    } catch (e) {
      setError(normalizeError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (users) {
      setLoading(false);
      return;
    }

    if (!tab || !profile) {
      return;
    }

    setLoading(true);
    getFriends();
  }, [profile, tab, users]);

  return {
    isLoading,
    error,
    storedUsers,
    getFriends,
  };
};
