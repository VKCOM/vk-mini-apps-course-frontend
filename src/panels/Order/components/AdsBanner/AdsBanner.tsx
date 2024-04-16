import {
  Banner,
  Button,
  useConfigProvider,
  Appearance,
  classNames,
  Spacing,
} from '@vkontakte/vkui';
import { Icon28VideoCircleOutline } from '@vkontakte/icons';

import BannerText from './BannerText';
import styles from './AdsBanner.module.css';

type Props = {
  onAdShow: () => void;
  isVisible: boolean;
  discount: number;
  isDisabled: boolean;
  error?: string;
};

const AdsBanner = ({
  onAdShow,
  isVisible,
  discount,
  error,
  isDisabled,
}: Props) => {
  const { appearance } = useConfigProvider();
  const isDarkTheme = appearance === Appearance.DARK;

  if (!isVisible) {
    return <></>;
  }
  return (
    <>
      <Banner
        header="Скидка за просмотр рекламы"
        imageTheme="light"
        subheader={<BannerText discount={discount} error={error} />}
        before={<Icon28VideoCircleOutline className={styles.playBtn} />}
        mode="image"
        actions={
          <Button
            appearance="positive"
            onClick={onAdShow}
            disabled={isDisabled}
          >
            Смотреть рекламу
          </Button>
        }
        background={
          <div
            className={classNames(
              styles.banner,
              isDarkTheme && styles.bannerOpacity,
            )}
          />
        }
      />
      <Spacing size={4} />
    </>
  );
};

export default AdsBanner;
