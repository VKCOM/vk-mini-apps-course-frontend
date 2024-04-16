import { FC } from 'react';
import { Alert, Button } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { EAlertActionMode } from './consts';
import { AlertActionProps } from './types';

type Props = {
  handleBackButton: () => void;
};

const AlertActions: FC<AlertActionProps> = ({
  mode,
  handleBackButton,
  children,
  onClick,
}) => {
  const isCancelBtn = mode === EAlertActionMode.CANCEL;

  return (
    <Button
      mode="tertiary"
      appearance={isCancelBtn ? 'negative' : 'accent'}
      size="m"
      children={children}
      onClick={isCancelBtn ? handleBackButton : onClick}
    />
  );
};

const OrderCancelPopout = ({ handleBackButton }: Props) => {
  const routeNavigator = useRouteNavigator();
  /*
    Модуль 4. Разработка Урок 4. Модальные окна #M4L4.
    Alert - всплывающее окно из @vkontakte/vkui.
  */
  return (
    <Alert
      actions={[
        {
          title: 'Отмена',
          mode: EAlertActionMode.DESTRUCTIVE,
        },
        {
          title: 'Прервать',
          mode: EAlertActionMode.CANCEL,
        },
      ]}
      actionsLayout="horizontal"
      actionsAlign="center"
      renderAction={(props) => (
        <AlertActions {...props} handleBackButton={handleBackButton} />
      )}
      /*
        Модуль 4. Разработка Урок 4. Модальные окна #M4L4.
        Скрытие модального окна на событие onClose.
      */
      onClose={() => void routeNavigator.hidePopout()}
      header="Прервать оформление заказа?"
      text="Данные будут утеряны"
    />
  );
};

export default OrderCancelPopout;
