import { useContext, useState, useEffect, ReactElement } from 'react';
import { Button, Div, ModalPageHeader, Separator } from '@vkontakte/vkui';

import { AppModalCloseBtn, ErrorSnackbar } from 'components';
import { setOrdersPublic } from 'api/user';
import { DataContext } from 'context/data';
import { ConfirmShareOrderModalContent } from 'panels/Profile/components';

type Props = {
  onClose: () => void;
};

const ConfirmShareOrderModal = ({ onClose }: Props) => {
  const [snackbar, setSnackbar] = useState<ReactElement | null>(null);
  const [isOrdersPublicAttr, setOrdersPublicAttr] = useState(false);

  const dataContext = useContext(DataContext);
  const profile = dataContext?.data?.profile;

  const showErrorSnackbar = () => {
    if (snackbar) return;
    setSnackbar(<ErrorSnackbar onClose={() => setSnackbar(null)} />);
  };

  useEffect(() => {
    if (!profile) {
      return;
    }

    setOrdersPublicAttr(profile.is_orders_public);
  }, [profile]);

  const onRadioItemClick = () => {
    setOrdersPublicAttr((shareOrder) => !shareOrder);
  };

  const onSaveClick = () => {
    if (!profile || isOrdersPublicAttr === !!profile.is_orders_public) {
      return onClose();
    }

    try {
      setOrdersPublic(profile.id);
      dataContext.setData({
        ...dataContext.data,
        profile: {
          ...profile,
          is_orders_public: isOrdersPublicAttr,
        },
      });
    } catch {
      showErrorSnackbar();
    }

    onClose();
  };

  return (
    <>
      <ModalPageHeader
        noSeparator
        after={<AppModalCloseBtn onClose={onClose} />}
      >
        Отображение заказов
      </ModalPageHeader>

      <Separator />

      <ConfirmShareOrderModalContent
        isOrdersPublic={isOrdersPublicAttr}
        onRadioItemClick={onRadioItemClick}
      />

      <Div>
        <Button onClick={onSaveClick} stretched size="l">
          Сохранить
        </Button>
      </Div>
      {snackbar}
    </>
  );
};

export default ConfirmShareOrderModal;
