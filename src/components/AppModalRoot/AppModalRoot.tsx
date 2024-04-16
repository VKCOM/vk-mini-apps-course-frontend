import { ModalRoot, ModalPage } from '@vkontakte/vkui';
import {
  useActiveVkuiLocation,
  useRouteNavigator,
  useSearchParams,
} from '@vkontakte/vk-mini-apps-router';

import { EModal } from 'consts/modals';
import { DishModal } from 'panels/Dishes/components';
import { AddressModal, OrderStatusModal } from 'panels/Order/components';
import { AdsModal, ConfirmShareOrderModal } from 'panels/Profile/components';
import { UserModal } from 'panels/Rating/components';

const AppModalRoot = () => {
  const { modal: activeModal } = useActiveVkuiLocation();
  const routeNavigator = useRouteNavigator();
  const [searchParams] = useSearchParams();

  const onClose = () => {
    routeNavigator.hideModal(Boolean(searchParams.get('stepBack')));
  };

  /*
    Модуль 4. Разработка Урок 4. Модальные окна #M4L4.
    ModalRoot - обертка для всех модальных окон ModalPage.
    У каждого модального окна уникальный id.
  */
  return (
    <ModalRoot activeModal={activeModal} onClose={onClose}>
      <ModalPage id={EModal.DISH} onClose={onClose}>
        <DishModal onClose={onClose} />
      </ModalPage>
      <ModalPage id={EModal.CONFIRM_SHARE_ORDER} onClose={onClose}>
        <ConfirmShareOrderModal onClose={onClose} />
      </ModalPage>
      <ModalPage id={EModal.USER} onClose={onClose}>
        <UserModal onClose={onClose} />
      </ModalPage>
      <ModalPage id={EModal.ORDER_ADDRESS} onClose={onClose}>
        <AddressModal onClose={onClose} />
      </ModalPage>
      <ModalPage
        id={EModal.ORDER_STATUS}
        onClose={onClose}
        dynamicContentHeight
      >
        <OrderStatusModal onClose={onClose} />
      </ModalPage>
      <AdsModal onClose={onClose} id={EModal.ADS_SETTINGS} />
    </ModalRoot>
  );
};

export default AppModalRoot;
