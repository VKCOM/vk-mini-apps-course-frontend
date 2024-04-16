import { PanelSpinner } from '@vkontakte/vkui';

import styles from './AppPanelSpinner.module.css';

const AppPanelSpinner = () => {
  return (
    <div className={styles.container}>
      <PanelSpinner size="large" height={100}>
        Загрузка...
      </PanelSpinner>
    </div>
  );
};

export default AppPanelSpinner;
