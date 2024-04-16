import { Placeholder, Button } from '@vkontakte/vkui';
import { Icon56GhostOutline } from '@vkontakte/icons';

type Props = {
  action?: () => void;
};

const NetworkError = ({ action }: Props) => {
  return (
    <Placeholder
      stretched
      icon={<Icon56GhostOutline />}
      header="Не удалось загрузить"
      action={
        action && (
          <Button size="m" mode="secondary" onClick={action}>
            Повторить
          </Button>
        )
      }
    >
      {action && 'Повторите попытку'}
    </Placeholder>
  );
};

export default NetworkError;
