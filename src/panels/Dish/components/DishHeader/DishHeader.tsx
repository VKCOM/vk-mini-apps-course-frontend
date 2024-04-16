import { useState, ReactElement } from 'react';
import { Title, CellButton, SimpleCell } from '@vkontakte/vkui';
import { Icon24Like, Icon24LikeOutline } from '@vkontakte/icons';

import { ErrorSnackbar } from 'components';
import { getDishes } from 'api/dishes';
import { setFavourite } from 'api/restaurants';
import { TDish } from 'panels/Dishes/types';

import styles from './DishHeader.module.css';

const DishHeader = ({ is_favourite, name, restaurant }: TDish) => {
  const [snackbar, setSnackbar] = useState<ReactElement | null>(null);
  const [isFavouriteAttr, setFavouriteAttr] = useState(is_favourite);
  const LikeIcon = isFavouriteAttr ? Icon24Like : Icon24LikeOutline;

  const showErrorSnackbar = () => {
    if (snackbar) return;
    setSnackbar(<ErrorSnackbar onClose={() => setSnackbar(null)} />);
  };

  const handleLikeBtnClick = () => {
    try {
      setFavouriteAttr((value) => !value);
      setFavourite(restaurant.id);
      getDishes();
    } catch {
      showErrorSnackbar();
    }
  };

  /*
    Модуль 4. Разработка Урок 2. Знакомство с VKUI #M4L2.
    SimpleCell, CellButton, Title.
  */
  return (
    <>
      <SimpleCell
        disabled
        after={
          <CellButton
            onClick={handleLikeBtnClick}
            hasActive={false}
            hasHover={false}
          >
            <LikeIcon className={styles.likeBtnIcon} />
          </CellButton>
        }
      >
        <Title level="2" className={styles.dishName}>
          {name}
        </Title>
      </SimpleCell>
      {snackbar}
    </>
  );
};

export default DishHeader;
