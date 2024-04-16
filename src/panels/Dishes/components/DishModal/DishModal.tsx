import { useState, useEffect, useContext } from 'react';
import {
  ModalPageHeader,
  PanelHeaderButton,
  useModalRootContext,
  Spinner,
} from '@vkontakte/vkui';
import { Icon16Favorite } from '@vkontakte/icons';
import { useParams } from '@vkontakte/vk-mini-apps-router';

import { AppModalCloseBtn, NetworkError } from 'components';
import { DataContext } from 'context/data';
import { DishModalContent } from 'panels/Dishes/components';
import { TDish } from 'panels/Dishes/types';

import styles from './DishModal.module.css';

type Props = {
  onClose: () => void;
};

const DishModal = ({ onClose }: Props) => {
  const { updateModalHeight } = useModalRootContext();
  const params = useParams<'id'>();
  const dishId = params?.id;
  const [isLoading, setLoading] = useState(true);
  const [dish, setDish] = useState<TDish | null>(null);

  const dataContext = useContext(DataContext);
  const dishes = dataContext?.data?.dishes;

  useEffect(() => {
    if (!dishId || !dishes) {
      return;
    }

    const dish = dishes?.find((dish) => dish.id === Number(dishId));

    if (dish) {
      setDish(dish);
    }
    setLoading(false);
  }, [dishId, dishes]);

  useEffect(() => {
    updateModalHeight();
  }, [dish]);

  if (isLoading) {
    return (
      <div className={styles.emptyModal}>
        <Spinner size="medium" />
      </div>
    );
  }

  if (!dish) {
    return (
      <div className={styles.emptyModal}>
        <NetworkError />
      </div>
    );
  }

  return (
    <>
      <ModalPageHeader
        float={true}
        before={
          <PanelHeaderButton className={styles.headerRatingBtn}>
            <Icon16Favorite className={styles.iconFavorite} />
            {dish.restaurant.rating}
          </PanelHeaderButton>
        }
        after={<AppModalCloseBtn onClose={onClose} />}
      />
      <DishModalContent content={dish} />
    </>
  );
};

export default DishModal;
