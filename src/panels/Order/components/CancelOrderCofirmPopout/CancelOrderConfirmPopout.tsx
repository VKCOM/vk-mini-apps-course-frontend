import { Alert } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

type Props = {
  onAction: () => void;
};

const CancelOrderConfirmPopout = ({ onAction }: Props) => {
  const routeNavigator = useRouteNavigator();

  const onClose = () => {
    void routeNavigator.hideModal();
  };

  return (
    <Alert
      actions={[
        {
          title: 'Отменить заказ',
          mode: 'destructive',
          action: onAction,
        },
        {
          title: 'Отмена',
          mode: 'cancel',
        },
      ]}
      actionsLayout="vertical"
      onClose={onClose}
      header="Подтвердите действие"
      text="Вы уверены, что хотите отменить заказ?"
    />
  );
};

export default CancelOrderConfirmPopout;
