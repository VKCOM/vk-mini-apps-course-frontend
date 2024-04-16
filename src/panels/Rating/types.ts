export type TUserFromBack = {
  compatibility: number;
  id: number;
  is_orders_public: boolean;
  lvl: number;
  orders_count: number;
};

export type TUser = TUserFromBack & {
  first_name: string;
  is_friend: boolean;
  last_name: string;
  photo_200: string;
};
