import { Placeholder, Group, Div, Button } from '@vkontakte/vkui';
import { Icon56CancelCircleOutline } from '@vkontakte/icons';

import styles from './CanceledOrderPlaceholder.module.css';

type Props = {
  title: string;
  label: string;
};

const CanceledOrderPlaceholder = ({ title, label }: Props) => (
  <Group>
    <Placeholder
      noPadding
      className={styles.placeholder}
      icon={<Icon56CancelCircleOutline className={styles.canceledIcon} />}
      header={title}
    >
      {label}
    </Placeholder>
    <Div>
      <Button
        size="l"
        stretched
        mode="secondary"
        href={'https://vk.com/vkappsdev'}
        target="_blank"
      >
        Написать в поддержку
      </Button>
    </Div>
  </Group>
);

export default CanceledOrderPlaceholder;
