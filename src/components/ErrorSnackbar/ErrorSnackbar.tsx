import { Snackbar } from '@vkontakte/vkui';
import { Icon28ErrorCircleOutline } from '@vkontakte/icons';

import styles from './ErrorSnackbar.module.css';

type Props = {
  onClose: () => void;
};

const ErrorSnackbar = ({ onClose }: Props) => (
  <Snackbar
    onClose={onClose}
    before={<Icon28ErrorCircleOutline className={styles.errorIcon} />}
  >
    Что-то пошло не так
  </Snackbar>
);

export default ErrorSnackbar;
