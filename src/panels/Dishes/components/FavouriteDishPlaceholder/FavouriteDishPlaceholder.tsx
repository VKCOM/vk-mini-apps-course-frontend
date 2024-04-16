import { Placeholder, Button } from '@vkontakte/vkui';
import { Icon56LikeOutline } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

const FavouriteDishPlaceholder = () => {
  const routeNavigator = useRouteNavigator();

  const actionHandler = () => void routeNavigator.push('/?segment=list');

  return (
    <Placeholder
      stretched
      icon={<Icon56LikeOutline />}
      header="У вас пока нет любимых блюд"
      action={
        <Button size="m" mode="primary" onClick={actionHandler}>
          К списку блюд
        </Button>
      }
    >
      Добавьте любимые блюда из общего списка блюд дня
    </Placeholder>
  );
};

export default FavouriteDishPlaceholder;
