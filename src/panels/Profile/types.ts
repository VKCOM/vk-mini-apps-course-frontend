import { UserInfo } from '@vkontakte/vk-bridge';

type TUser = {
  achievements: TAchievement[];
  ads_disabled_until: null | string;
  compatibility: number;
  id: number;
  is_ads_enabled: boolean;
  is_donates_enabled: boolean;
  is_notification_enabled: boolean;
  is_orders_public: boolean;
  is_subscription_enabled: boolean;
  is_vk_pay_enabled: boolean;
  lvl: number;
  notifications_count: number;
  orders_count: number;
};

type TAchievement = {
  activated: boolean;
  code: string;
  id: number;
  img: string;
  story_img: string;
  title: string;
};

type TUserSettings = {
  isOrdersPublic?: boolean;
};

type TDonateProducts = {
  donateProducts: {
    code: string;
    period: null | number;
  }[];
};

type TProfile = TUser & UserInfo & TDonateProducts;

export type { TUser, TAchievement, TProfile, TUserSettings };
