import { useState, useEffect, useContext } from 'react';
import { Panel, PanelHeader, PanelProps } from '@vkontakte/vkui';
import { useSearchParams } from '@vkontakte/vk-mini-apps-router';

import { useGetFriends } from 'hooks';
import { DataContext } from 'context/data';
import { TUser } from 'panels/Rating/types';
import { PanelContent, RatingTabs } from './components';
import { ETab } from './consts';

const RatingPanel = ({ id }: PanelProps) => {
  const [tab, setTab] = useState<ETab | null>(null);
  const [users, setUsers] = useState<TUser[]>([]);
  const [params] = useSearchParams();

  const dataContext = useContext(DataContext);
  const storedUsers = dataContext?.data?.users;

  const { isLoading, error, getFriends } = useGetFriends(tab);

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
