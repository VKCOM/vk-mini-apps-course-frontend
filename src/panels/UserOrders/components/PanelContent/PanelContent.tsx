import { AppPanelSpinner, NetworkError } from 'components';
import { TOrder } from 'panels/Order/types';
import { UserOrdersList, EmptyOrders } from 'panels/UserOrders/components';

type Props = {
  isLoading: boolean;
  orders: TOrder[];
  error: Error | null;
  loadOrders: () => void;
};

const PanelContent = ({ isLoading, orders, error, loadOrders }: Props) => {
  if (isLoading) {
    return <AppPanelSpinner />;
  }

  if (error) {
    return <NetworkError action={loadOrders} />;
  }

  if (!orders.length) {
    return <EmptyOrders />;
  }

  return <UserOrdersList orders={orders} />;
};

export default PanelContent;
