import { useState, useEffect, useContext } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  Panel,
  PanelHeader,
  useAdaptivityConditionalRender,
  Platform,
  usePlatform,
} from '@vkontakte/vkui';
import { useSearchParams } from '@vkontakte/vk-mini-apps-router';

import { useGetFriends } from 'hooks';
import { DataContext } from 'context/data';
import { APP_WIDTH, APP_HEIGHT } from 'consts/app';
import { TUser } from 'panels/Rating/types';
import { PanelContent, RatingTabs } from './components';
import { ETab } from './consts';

const USER_CELL_LENGTH = 80;
const VISIBLE_USER_CELLS_PER_PAGE = 7;

type Props = {
  id: string;
  adsBannerPadding: number;
};

const RatingPanel = ({ id, adsBannerPadding }: Props) => {
  const [tab, setTab] = useState<ETab | null>(null);
  const [users, setUsers] = useState<TUser[]>([]);
  const [params] = useSearchParams();

  const { sizeX } = useAdaptivityConditionalRender();
  const platform = usePlatform();
  const isWeb = sizeX.regular && platform === Platform.VKCOM;

  const dataContext = useContext(DataContext);
  const storedUsers = dataContext?.data?.users;

  const { isLoading, error, getFriends } = useGetFriends(tab);

  const resizeWindow = async (usersLength: number) => {
    try {
      await bridge.send('VKWebAppResizeWindow', {
        width: APP_WIDTH,
        height:
          APP_HEIGHT +
          (usersLength - VISIBLE_USER_CELLS_PER_PAGE - 1) * USER_CELL_LENGTH +
          adsBannerPadding,
      });
    } catch (err) {
      console.log('Ошибка выполнения VKWebAppResizeWindow:', err);
    }
  };

  useEffect(() => {
    params.get('tab') ? setTab(ETab.ALL) : setTab(ETab.FRIENDS);
  }, [params]);

  useEffect(() => {
    if (!storedUsers) {
      return;
    }

    if (tab === ETab.ALL) {
      setUsers(storedUsers);
    } else {
      const friends = storedUsers.filter((user) => user.is_friend);
      setUsers(friends);
    }
  }, [storedUsers, tab]);

  useEffect(() => {
    if (!users || users.length < 8 || !isWeb) {
      return;
    }
    resizeWindow(users.length);

    return () => {
      bridge.send('VKWebAppResizeWindow', {
        width: APP_WIDTH,
        height: APP_HEIGHT,
      });
    };
  }, [users]);

  return (
    <Panel id={id}>
      <PanelHeader fixed delimiter="none">
        Блюдо дня
      </PanelHeader>
      <RatingTabs tab={tab} />
      <PanelContent
        isLoading={isLoading}
        users={users}
        error={error}
        tab={tab}
        getFriends={getFriends}
      />
    </Panel>
  );
};

export default RatingPanel;
