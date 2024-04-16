import { useContext, useState, ReactElement } from 'react';
import { Button, ModalCard, ButtonGroup } from '@vkontakte/vkui';
import { Icon56VideoCircleOutline } from '@vkontakte/icons';

import { ErrorSnackbar } from 'components';
import { disableAds, hideBannerAds } from 'helpers';
import { EModal } from 'consts/modals';
import { DataContext } from 'context/data';

type Props = {
  onClose: () => void;
  id: EModal;
};

const AdsModal = ({ onClose, id }: Props) => {
  const [isDisabled, setDisabled] = useState(false);
  const [snackbar, setSnackbar] = useState<ReactElement | null>(null);

  const dataContext = useContext(DataContext);
  const donateProducts = dataContext?.data?.profile?.donateProducts;

  const showErrorSnackbar = () => {
    if (snackbar) return;
    setSnackbar(<ErrorSnackbar onClose={() => setSnackbar(null)} />);
  };

  const adsDisableCallback = () => {
    if (!dataContext?.data?.profile) {
      return;
    }
    dataContext.setData({
      ...dataContext.data,
      profile: {
        ...dataContext.data.profile,
        is_ads_enabled: false,
      },
    });
    hideBannerAds();
    onClose();
  };

  const onAdsDisabled = (option: string) => {
    if (isDisabled) {
      return;
    }
    setDisabled(true);
    const product = donateProducts?.find((product) => product.code === option);

    if (!product) {
      setDisabled(false);
      showErrorSnackbar();
      return;
    }

    disableAds(
      product.code,
      adsDisableCallback,
      showErrorSnackbar,
      setDisabled,
    );
  };

  return (
    <>
      <ModalCard
        onClose={onClose}
        icon={<Icon56VideoCircleOutline />}
        id={id}
        header="Реклама включена"
        subheader="можно отключить за голоса"
        actions={
          <ButtonGroup mode="vertical" stretched>
            <Button
              size="l"
              onClick={() => onAdsDisabled('one_time_vote')}
              stretched
              mode="primary"
              disabled={isDisabled}
            >
              Отключить навсегда
            </Button>
            <Button
              size="l"
              onClick={() => onAdsDisabled('subscribe_vote')}
              stretched
              mode="secondary"
              disabled={isDisabled}
            >
              Отключить на месяц
            </Button>
          </ButtonGroup>
        }
      />
      {snackbar}
    </>
  );
};

export default AdsModal;
