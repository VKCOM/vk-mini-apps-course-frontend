import { useContext, useState, ReactElement } from 'react';
import {
  Placeholder,
  Title,
  ButtonGroup,
  Button,
  Spacing,
  Image,
  Div,
} from '@vkontakte/vkui';
import {
  Icon28LikeFillRed,
  Icon28LikeOutline,
  Icon24Add,
} from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { ErrorSnackbar } from 'components';
import { joinGroup } from 'helpers';
import { getDishes } from 'api/dishes';
import { setFavourite } from 'api/restaurants';
import { DataContext } from 'context/data';
import { Dish } from 'panels/Dishes/components';
import { TDish } from 'panels/Dishes/types';

import styles from './DishModalContent.module.css';

type Props = {
  content: TDish;
};

const DishModalContent = ({ content }: Props) => {
  const [snackbar, setSnackbar] = useState<ReactElement | null>(null);
  const { id, is_favourite, restaurant } = content;
  const routeNavigator = useRouteNavigator();
  const dataContext = useContext(DataContext);

  const showErrorSnackbar = () => {
    if (snackbar) return;
    setSnackbar(<ErrorSnackbar onClose={() => setSnackbar(null)} />);
  };

  const navigateToDish = () => {
    void routeNavigator.push(`/dish/${id}`);
  };

  const joinRestaurantGroup = () => {
    joinGroup(restaurant.group_id);
  };

  const handleFavouriteBtn = async () => {
    try {
      await setFavourite(restaurant.id);
      const fetchedDishes = await getDishes();

      if (!dataContext || !fetchedDishes) {
        return;
      }

      dataContext.setData({
        ...dataContext.data,
        dishes: fetchedDishes,
      });
    } catch {
      showErrorSnackbar();
    }
  };

  return (
    <>
      <Div className={styles.container}>
        <Spacing size={8} />
        <Placeholder
          icon={<Image src={restaurant.img} size={56} />}
          header={restaurant.name}
          noPadding
        >
          {restaurant.description}
        </Placeholder>
        <Spacing size={16} />
        <ButtonGroup stretched>
          <Button
            mode="primary"
            stretched
            size="m"
            before={<Icon24Add />}
            onClick={joinRestaurantGroup}
          >
            Подписаться
          </Button>
          <Button
            mode="secondary"
            size="m"
            href={restaurant.link}
            target="_blank"
          >
            Перейти
          </Button>
          <Button mode="secondary" size="m" onClick={handleFavouriteBtn}>
            {is_favourite ? <Icon28LikeFillRed /> : <Icon28LikeOutline />}
          </Button>
        </ButtonGroup>
        <Spacing size={20} />
        <Title level="3">Блюдо дня</Title>
        <Spacing size={6} />
        <Dish dish={content} navigateToDish={navigateToDish} />
        <Spacing size={12} />
      </Div>
      {snackbar}
    </>
  );
};

export default DishModalContent;
