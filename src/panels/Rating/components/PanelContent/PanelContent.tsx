import { AppPanelSpinner, NetworkError } from 'components';
import { UserList, EmptyRating } from 'panels/Rating/components';
import { ETab } from 'panels/Rating/consts';
import { TUser } from 'panels/Rating/types';

type Props = {
  isLoading: boolean;
  users: TUser[];
  error: Error | null;
  tab: ETab | null;
  getFriends: () => void;
};

const PanelContent = ({ isLoading, users, error, tab, getFriends }: Props) => {
  if (isLoading) {
    return <AppPanelSpinner />;
  }

  if (error) {
    return <NetworkError action={getFriends} />;
  }

  if (users.length === 0) {
    if (tab === ETab.ALL) {
      return <NetworkError />;
    }
    return <EmptyRating />;
  }
  return <UserList users={users} />;
};

export default PanelContent;
