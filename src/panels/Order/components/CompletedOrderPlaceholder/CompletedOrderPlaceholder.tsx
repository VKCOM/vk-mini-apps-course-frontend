import { Placeholder } from '@vkontakte/vkui';
import { Icon56CheckCircleOutline } from '@vkontakte/icons';

import { plural } from 'utils';
import { OrderRating } from 'panels/Order/components';

import styles from './CompletedOrderPlaceholder.module.css';

type Props = {
  bonus: number;
  title: string;
  orderId?: string;
  onClose: () => void;
  rate: number;
};

const CompletedOrderPlaceholder = ({
  title,
  bonus,
  orderId,
  onClose,
  rate,
}: Props) => (
  <>
    <Placeholder
      noPadding
      className={styles.placeholder}
      icon={<Icon56CheckCircleOutline className={styles.completedIcon} />}
      header={title}
    >
      {`+ ${bonus} ${plural(['уровень', 'уровня', 'уровней'], bonus)}`} к
      рейтингу
    </Placeholder>
    <OrderRating orderId={orderId} onClose={onClose} rate={rate} />
  </>
);

export default CompletedOrderPlaceholder;
