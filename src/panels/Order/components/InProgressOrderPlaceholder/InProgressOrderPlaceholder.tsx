import { Placeholder, Group } from '@vkontakte/vkui';

import { orderSteps } from 'mocks/orders';
import { OrderStatusLabel } from 'panels/Order/components';
import { EOrderStatus } from 'panels/Order/consts';
import { TOrderStep } from 'panels/Order/types';

import styles from './InProgressOrderPlaceholder.module.css';

type Props = {
  orderStep: TOrderStep;
  status: EOrderStatus;
};

const InProgressOrderPlaceholder = ({ orderStep, status }: Props) => (
  <>
    <Group>
      <Placeholder
        noPadding
        className={styles.placeholder}
        icon={<img src={orderStep.img} className={styles.placeholderImg} />}
        header={orderStep.title}
      >
        {orderStep.subtitle}
      </Placeholder>
    </Group>

    <Group separator="auto" mode="plain" className={styles.statusesContainer}>
      {orderSteps.map(
        (step) =>
          step.status !== EOrderStatus.NEW && (
            <OrderStatusLabel step={step} key={step.id} currentStep={status} />
          ),
      )}
    </Group>
  </>
);

export default InProgressOrderPlaceholder;
