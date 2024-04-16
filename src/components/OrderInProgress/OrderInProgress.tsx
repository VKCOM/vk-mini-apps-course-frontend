import { useContext } from 'react';
import { Div, FixedLayout } from '@vkontakte/vkui';

import { DataContext } from 'context/data';
import { OrderBanner } from 'components';

const OrderInProgress = () => {
  const dataContext = useContext(DataContext);
  const orderInProgress = dataContext?.data?.orderInProgress;

  if (!orderInProgress) {
    return;
  }

  return (
    <FixedLayout vertical="top">
      <Div>
        <OrderBanner {...orderInProgress} />
      </Div>
    </FixedLayout>
  );
};

export default OrderInProgress;
