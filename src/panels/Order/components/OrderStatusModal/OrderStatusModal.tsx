import { useEffect, useState, useContext, ReactElement } from 'react';
import {
  ModalPageHeader,
  useModalRootContext,
  Snackbar,
  Spinner,
} from '@vkontakte/vkui';
import { useParams } from '@vkontakte/vk-mini-apps-router';
import {
  Icon28CheckCircleOutline,
  Icon28ErrorCircleOutline,
} from '@vkontakte/icons';

import { AppModalCloseBtn, NetworkError } from 'components';
import { getLinkToApp, copyText, normalizeError } from 'helpers';
import { cancelOrder, getOrder } from 'api/orders';
import { getUser } from 'api/user';
import { DataContext } from 'context/data';
import { orderSteps } from 'mocks/orders';
import {
  InProgressOrderPlaceholder,
  OrderDish,
  CompletedOrderPlaceholder,
  CanceledOrderPlaceholder,
} from 'panels/Order/components';
import { EOrderStatus } from 'panels/Order/consts';
import { TOrderStep, TOrder } from 'panels/Order/types';

import styles from './OrderStatusModal.module.css';

type Props = {
  onClose: () => void;
};

const OrderStatusModal = ({ onClose }: Props) => {
  const { updateModalHeight } = useModalRootContext();
  const [snackbar, setSnackbar] = useState<ReactElement | null>(null);
  const [content, setContent] = useState<TOrderStep | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<EOrderStatus>(EOrderStatus.CREATING);
  const [order, setOrder] = useState<TOrder>();

  const params = useParams<'id'>();
  const orderId = params?.id;

  const dataContext = useContext(DataContext);
  const orderInProgress = dataContext?.data?.orderInProgress;

  const isCanceled = status === EOrderStatus.CANCELED;
  const isCompleted = status === EOrderStatus.COMPLETED;
  const isAwaitingPayment = status === EOrderStatus.AWAITING_PAYMENT;

  const isDeliveryInProgress =
    !isCompleted && !isCanceled && !isAwaitingPayment;

  useEffect(() => {
    if (!orderId) {
      return;
    }
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const fetchedOrder = await getOrder(Number(orderId));
      setOrder(fetchedOrder);
      setStatus(fetchedOrder.status);

      if (fetchedOrder.id === orderInProgress?.id) {
        dataContext?.setData({
          ...dataContext.data,
          orderInProgress: isCanceled || isCompleted ? null : fetchedOrder,
        });
      }
    } catch (e) {
      setError(normalizeError(e));
    }
  };

  const onCancelOrder = () => {
    cancelOrder(Number(orderId)).then(() => loadOrder());
  };

  const updateUser = async () => {
    if (!dataContext?.data?.profile) {
      return;
    }

    try {
      const fetchedUser = await getUser(dataContext.data.profile.id);

      dataContext?.setData({
        ...dataContext.data,
        profile: {
          ...dataContext.data?.profile,
          ...fetchedUser,
        },
        orderInProgress: null,
      });
    } catch (e) {
      setError(normalizeError(e));
    }
  };

  useEffect(() => {
    if (!orderId) {
      return;
    }

    updateModalHeight();
    setContent(
      orderSteps.find((step) => step.status === status) || orderSteps[0],
    );

    if (isDeliveryInProgress) {
      const timer = setTimeout(() => {
        loadOrder();
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    } else {
      updateUser();
    }
  }, [status, order]);

  const copyLink = async () => {
    const linkToPage = getLinkToApp(window.location.hash);
    try {
      await copyText(linkToPage);
      setSnackbar(
        <Snackbar
          className={styles.copySnackbar}
          onClose={() => setSnackbar(null)}
          before={<Icon28CheckCircleOutline className={styles.successIcon} />}
        >
          Ссылка скопирована в буфер обмена
        </Snackbar>,
      );
    } catch {
      setSnackbar(
        <Snackbar
          onClose={() => setSnackbar(null)}
          before={<Icon28ErrorCircleOutline className={styles.errorIcon} />}
        >
          Не удалось скопировать ссылку
        </Snackbar>,
      );
    }
  };

  if (error) {
    return (
      <div className={styles.emptyModal}>
        <NetworkError />
      </div>
    );
  }

  if (!order || !content) {
    return (
      <div className={styles.emptyModal}>
        <Spinner size="medium" />
      </div>
    );
  }

  return (
    <>
      <ModalPageHeader
        float={true}
        after={<AppModalCloseBtn onClose={onClose} />}
      />

      {isAwaitingPayment && (
        <div className={styles.emptyModal}>
          <Spinner size="medium" />
        </div>
      )}

      {isCompleted && (
        <CompletedOrderPlaceholder
          bonus={order.dish.bonus}
          title={content.title}
          orderId={orderId}
          onClose={onClose}
          rate={order.rating ?? 0}
        />
      )}

      {isCanceled && (
        <CanceledOrderPlaceholder label={content.label} title={content.title} />
      )}

      {isDeliveryInProgress && (
        <InProgressOrderPlaceholder orderStep={content} status={status} />
      )}

      <OrderDish
        isDeliveryInProgress={isDeliveryInProgress}
        dish={{
          ...order.dish,
          price: Number(
            Math.ceil(order.price * ((100 - order.discount) / 100)),
          ),
        }}
        orderId={order.id}
        parsedDishOptions={''}
        onCancelOrder={onCancelOrder}
        copyLink={copyLink}
      />
      {snackbar}
    </>
  );
};

export default OrderStatusModal;
