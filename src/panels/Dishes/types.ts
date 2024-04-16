type TDish = {
  bonus: number;
  description: string;
  dish_options: TDishOption[];
  extra_options: TExtraOption[];
  full_img: string;
  id: number;
  is_favourite: boolean;
  name: string;
  price: number;
  restaurant: TRestaurant;
  small_img: string;
};

type TRestaurant = {
  cords: {
    lng: number;
    lat: number;
  };
  description: string;
  group_id: number;
  id: number;
  img: string;
  link: string;
  name: string;
  rating: number;
};

type TDishOption = {
  id: string;
  name: string;
  price: number;
  is_selected: boolean;
};

type TExtraOption = {
  id: string;
  name: string;
  is_selected: boolean;
};

export type { TDish, TDishOption, TExtraOption };
