import { Placeholder, Button } from '@vkontakte/vkui';
import { Icon56GhostOutline } from '@vkontakte/icons';

const DishPlaceholder = () => (
  <Placeholder
    stretched
    icon={<Icon56GhostOutline />}
    header="Не удалось загрузить"
    action={
      <Button size="m" mode="secondary">
        Повторить
      </Button>
    }
  >
    Повторите попытку
  </Placeholder>
);

export default DishPlaceholder;
