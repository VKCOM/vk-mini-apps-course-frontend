import {
  PanelHeaderButton,
  useAdaptivityConditionalRender,
  Platform,
  usePlatform,
} from '@vkontakte/vkui';
import { Icon24Dismiss } from '@vkontakte/icons';

import styles from './AppModalCloseBtn.module.css';

type Props = {
  onClose: () => void;
};

const AppModalCloseBtn = ({ onClose }: Props) => {
  const { sizeX } = useAdaptivityConditionalRender();
  const platform = usePlatform();
  const isMobile =
    sizeX.compact &&
    (platform === Platform.ANDROID || platform === Platform.IOS);

  if (!isMobile) {
    return null;
  }

  return (
    <PanelHeaderButton className={styles.headerCloseBtn} onClick={onClose}>
      <Icon24Dismiss />
    </PanelHeaderButton>
  );
};

export default AppModalCloseBtn;
