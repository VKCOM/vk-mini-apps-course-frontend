import { useEffect, useState, ReactElement, useContext } from 'react';
import { TransactionResult } from '@vkontakte/vk-bridge';
import { Div, Snackbar, Button } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon28ErrorCircleOutline } from '@vkontakte/icons';

import { AppPanelSpinner, NetworkError } from 'components';
import { openPayForm } from 'helpers';
import { useBridgeSubscribePaymentResult } from 'hooks';
import { updateOrder, getVKPayOrder, cancelOrder } from 'api/orders';
import { DataContext } from 'context/data';
import { Dish } from 'panels/Dishes/components';
import { TExtraOption } from 'panels/Dishes/types';
import {
  OrderContent,
  OrderPrice,
  OrderFooter,
  CancelOrderConfirmPopout,
} from 'panels/Order/components';
import { EOrderStatus } from 'panels/Order/consts';
import { TOrder, TAddress } from 'panels/Order/types';

import styles from './PanelContent.module.css';

type Props = {
  isLoading: boolean;
  error: Error | null;
  order: TOrder | null;
  currentAddress?: TAddress | null;
  loadOrder: () => void;
};

const PanelContent = ({
  isLoading,
  error,
  order,
  currentAddress,
  loadOrder,
}: Props) => {
  const [address, setAddress] = useState<TAddress | null>(null);
  const [price, setPrice] = useState(0);
  const [snackbar, setSnackbar] = useState<ReactElement | null>(null);
  const [extraOptions, setExtraOptions] = useState<TExtraOption[] | null>([]);

  const routeNavigator = useRouteNavigator();
  const orderId = order?.id;

  const isFinallyStatus =
    order?.status === EOrderStatus.COMPLETED ||
    order?.status === EOrderStatus.CANCELED;

  const dataContext = useContext(DataContext);
  const profile = dataContext?.data?.profile;
  const orderInProgress = dataContext?.data?.orderInProgress;

  const handlePayFormResult = (data: TransactionResult) => {
    if (!data.status) {
      return;
    }
    void routeNavigator.push(`/order-status/${orderId}?stepBack=true`);
  };

  const showErrorSnackbar = (action?: () => void) => {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon28ErrorCircleOutline className={styles.errorIcon} />}
        after={
          <Button
            mode="link"
            appearance="accent"
            size="s"
            onClick={action ? action : checkout}
          >
            Повторить
          </Button>
        }
      >
        Что-то пошло не так
      </Snackbar>,
    );
  };

  const navigateToDish = () => {
    void routeNavigator.push(`/dish/${order?.dish.id}`);
  };

  useEffect(() => {
    if (!currentAddress) {
      return;
    }

    setAddress(currentAddress);
  }, [currentAddress]);

  useEffect(() => {
    if (!order) {
      return;
    }

    setAddress(order.delivery_address);
    setExtraOptions(order.dish.extra_options);
    setPrice(order.price);
  }, [order]);

  const triggerPaymentForm = async (id: number) => {
    try {
      const vkPayOrder = await getVKPayOrder(id);
      await openPayForm(vkPayOrder);
    } catch {
      showErrorSnackbar();
    }
  };

  const triggerUpdateOrder = async () => {
    if (!order) {
      return;
    }

    let selectedOptionsIds: string[] = [];
    if (extraOptions) {
      selectedOptionsIds = extraOptions
        .filter((option) => option.is_selected)
        .map((option) => option.id);
    }
    try {
      const updatedOrder = await updateOrder(
        order.id,
        address,
        selectedOptionsIds,
        price !== order.price,
      );
      dataContext?.setData({
        ...dataContext.data,
        orderInProgress: updatedOrder,
      });

      if (profile?.is_vk_pay_enabled) {
        triggerPaymentForm(updatedOrder.id);
      } else {
        void routeNavigator.push(`/order-status/${orderId}`);
      }
    } catch {
      showErrorSnackbar();
    }
  };

  const checkout = async () => {
    if (!order) {
      return;
    }

    if (order.status === EOrderStatus.NEW) {
      triggerUpdateOrder();
    } else if (
      order.status === EOrderStatus.AWAITING_PAYMENT &&
      profile?.is_vk_pay_enabled
    ) {
      triggerPaymentForm(order.id);
    } else {
      void routeNavigator.push(`/order-status/${orderId}`);
    }
  };

  const onCancelOrder = async () => {
    try {
      await cancelOrder(Number(orderId));
      if (orderInProgress?.id === order?.id) {
        dataContext?.setData({
          ...dataContext.data,
          orderInProgress: null,
        });
      }
      navigateToDish();
    } catch {
      showErrorSnackbar(onCancelOrder);
    }
  };

  const openCancelConfirmPopout = () => {
    routeNavigator.showPopout(
      <CancelOrderConfirmPopout onAction={onCancelOrder} />,
    );
  };

  useBridgeSubscribePaymentResult(handlePayFormResult, showErrorSnackbar);

  if (isLoading) {
    return <AppPanelSpinner />;
  }

  if (error || !order) {
    return <NetworkError action={loadOrder} />;
  }

  return (
    <>
      <Div className={styles.container}>
        <Dish dish={order.dish} navigateToDish={navigateToDish} />
        <OrderContent
          deliveryPrice={order.delivery_price}
          deliveryTime={order.delivery_time}
          extraOptions={extraOptions}
          deliveryAddress={address}
          setExtraOptions={setExtraOptions}
          isDisabled={order?.status !== EOrderStatus.NEW}
        />
        {!order.discount && (
          <OrderPrice
            price={price}
            initialPrice={order.price}
            setPrice={setPrice}
            isDisabled={order?.status !== EOrderStatus.NEW}
          />
        )}
      </Div>
      <OrderFooter
        price={price}
        isDisabled={isFinallyStatus || !address}
        isCancelDisabled={isFinallyStatus}
        checkout={checkout}
        onCancel={openCancelConfirmPopout}
      />
      {snackbar}
    </>
  );
};

export default PanelContent;
