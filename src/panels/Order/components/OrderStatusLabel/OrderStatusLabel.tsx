import { useMemo } from 'react';
import { classNames, HorizontalCell } from '@vkontakte/vkui';

import { getOrderStatusIcon } from 'helpers';
import { EOrderStatus } from 'panels/Order/consts';
import { TOrderStep } from 'panels/Order/types';

import styles from './OrderStatusLabel.module.css';

type Props = {
  step: TOrderStep;
  currentStep: EOrderStatus;
};

const OrderStatusLabel = ({ step, currentStep }: Props) => {
  const Icon = useMemo(() => getOrderStatusIcon(step.status), [step.status]);
  const isActiveCell = step.status === currentStep;
  const isPackingDone = Boolean(
    currentStep === EOrderStatus.PACKING &&
      step.status === EOrderStatus.CREATING,
  );
  const isDeliveringDone = Boolean(
    currentStep === EOrderStatus.DELIVERING &&
      (step.status === EOrderStatus.CREATING ||
        step.status === EOrderStatus.PACKING),
  );

  const isStepDone = isPackingDone || isDeliveringDone;

  if (step.status === EOrderStatus.CANCELED) {
    return <></>;
  }

  return (
    <HorizontalCell
      size="s"
      header={step.label}
      disabled
      className={classNames(
        styles.cell,
        { [styles.isActiveCell]: isActiveCell },
        { [styles.isVisitedCell]: isStepDone },
      )}
    >
      <Icon
        className={classNames(styles.cell, {
          [styles.isActiveIcon]: isActiveCell || isStepDone,
        })}
      />
    </HorizontalCell>
  );
};

export default OrderStatusLabel;
