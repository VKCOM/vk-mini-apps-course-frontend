import { ReactNode, Dispatch, SetStateAction } from 'react';

import { TDish } from 'panels/Dishes/types';
import { TAddress, TOrder } from 'panels/Order/types';
import { TProfile } from 'panels/Profile/types';
import { TUser } from 'panels/Rating/types';

type TProps = {
  children: ReactNode;
};

type TData = {
  dishes?: TDish[];
  orderInProgress?: TOrder | null;
  profile?: TProfile;
  address?: TAddress | null;
  users?: TUser[];
};

type TDataContext = {
  data: TData | null;
  setData: Dispatch<SetStateAction<TData | null>>;
};

export type { TData, TDataContext, TProps };
