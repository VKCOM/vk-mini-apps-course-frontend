import { RefObject } from 'react';
import { ActionSheet, ActionSheetItem } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { CancelOrderConfirmPopout } from 'panels/Order/components';

type Props = {
  onCancelOrder: () => void;
  btnRef: RefObject<HTMLElement> | null;
  copyLink: () => void;
};

type ActionEvent = {
  closedBy: string;
};

const OrderOptionsPopout = ({ onCancelOrder, btnRef, copyLink }: Props) => {
  const routeNavigator = useRouteNavigator();

  const openCancelConfirmPopout = () => {
    routeNavigator.showPopout(
      <CancelOrderConfirmPopout onAction={onCancelOrder} />,
    );
  };

  const onCopyLink = () => {
    copyLink();
    void routeNavigator.hidePopout();
  };

  const onActionCancel = (event: ActionEvent) => {
    if (event.closedBy === 'other') {
      void routeNavigator.hidePopout();
    }
  };

  return (
    <ActionSheet
      onClose={onActionCancel}
      toggleRef={btnRef}
      placement="left-start"
    >
      <ActionSheetItem onClick={onCopyLink}>Скопировать ссылку</ActionSheetItem>
      <ActionSheetItem onClick={openCancelConfirmPopout}>
        Отменить заказ
      </ActionSheetItem>
    </ActionSheet>
  );
};

export default OrderOptionsPopout;
