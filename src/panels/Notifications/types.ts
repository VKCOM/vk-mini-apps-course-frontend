import { EOrderStatus } from 'panels/Order/consts';

type TNotification = {
  action?: {
    order_id?: string;
    share_image?: string;
    title: string;
    type: EActionType;
  };
  date?: Date;
  id: string;
  img: string;
  is_viewed: boolean;
  status?: EOrderStatus;
  text: string;
  title: string;
};

const enum EActionType {
  LINK = 'link',
  SHARE = 'share',
  ORDER = 'order',
}

export { EActionType };
export type { TNotification };
