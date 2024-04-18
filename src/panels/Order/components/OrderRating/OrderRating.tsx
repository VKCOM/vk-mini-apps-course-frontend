import { useState, ReactElement } from 'react';
import {
  Group,
  Paragraph,
  ButtonGroup,
  IconButton,
  classNames,
} from '@vkontakte/vkui';
import { Icon28Favorite } from '@vkontakte/icons';

import { ErrorSnackbar } from 'components';
import { rateOrder } from 'api/orders';

import styles from './OrderRating.module.css';

const rating = [5, 4, 3, 2, 1];

type Props = {
  orderId?: string;
  onClose: () => void;
  rate: number;
};

const OrderRating = ({ orderId, onClose, rate }: Props) => {
  const [snackbar, setSnackbar] = useState<ReactElement | null>(null);

  const showErrorSnackbar = () => {
    if (snackbar) return;
    setSnackbar(<ErrorSnackbar onClose={() => setSnackbar(null)} />);
  };

  const handleRateBtn = async (star: number) => {
    if (!orderId) {
      return;
    }

    try {
      await rateOrder(Number(orderId), star);
      onClose();
    } catch {
      showErrorSnackbar();
    }
  };

  return (
    <>
      {' '}
      <Group className={styles.rating}>
        <Paragraph className={styles.ratingTitle}>
          {rate ? 'Оценка заказа' : 'Как вам заказ?'}
        </Paragraph>
        <ButtonGroup mode="horizontal" gap="s" className={styles.stars}>
          {rating.map((star) => (
            <IconButton
              key={star}
              onClick={() => handleRateBtn(star)}
              className={classNames(styles.ratingBtn, {
                [styles.disabled]: Boolean(rate),
              })}
              hasActive={false}
              hasHover={false}
              disabled={Boolean(rate)}
            >
              <Icon28Favorite
                className={classNames(styles.ratingIcon, {
                  [styles.rated]: star <= rate,
                })}
              />
            </IconButton>
          ))}
        </ButtonGroup>
      </Group>
      {snackbar}
    </>
  );
};

export default OrderRating;
