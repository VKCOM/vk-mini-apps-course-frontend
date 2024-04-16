import { useContext } from 'react';
import { Div, Footer, Spacing } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { OrderBanner } from 'components';
import { plural } from 'utils';
import { DataContext } from 'context/data';
import {
  Dish,
  DishPlaceholder,
  FavouriteDishPlaceholder,
} from 'panels/Dishes/components';
import { ETab } from 'panels/Dishes/consts';
import { TDish } from 'panels/Dishes/types';

import styles from './DishList.module.css';

type Props = {
  dishes: TDish[] | undefined;
  tab: ETab;
};

const DishList = ({ dishes, tab }: Props) => {
  const routeNavigator = useRouteNavigator();
  const dataContext = useContext(DataContext);
  const orderInProgress = dataContext?.data?.orderInProgress;

  const navigateToDish = (id: number) => {
    /* Модуль 4. Разработка Урок 3. Роутинг #M4L3. Переход с помощью push */
    void routeNavigator.push(`/dish/${id}`);
  };

  if (!dishes?.length) {
    switch (true) {
      case tab === ETab.FAVORITES:
        return <FavouriteDishPlaceholder />;
      default:
        return <DishPlaceholder />;
    }
  }

  return (
    <>
      <Spacing size={44} />
      {orderInProgress && (
        <Div>
          <OrderBanner {...orderInProgress} />
        </Div>
      )}
      <Div className={styles.dishListContainer}>
        {dishes.map((dish) => (
          <Dish
            dish={dish}
            tab={tab}
            key={dish.id}
            navigateToDish={navigateToDish}
          />
        ))}
        <Footer>
          {`${dishes.length} ${plural(
            ['блюдо', 'блюда', 'блюд'],
            dishes.length,
          )}`}
        </Footer>
      </Div>
    </>
  );
};

export default DishList;
