import { Placeholder, Button } from '@vkontakte/vkui';
import { Icon56GhostOutline } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

const EmptyOrders = () => {
  const routeNavigator = useRouteNavigator();

  return (
    <Placeholder
      stretched
      icon={<Icon56GhostOutline />}
      header="Нет заказов"
      action={
        <Button
          size="m"
          onClick={() => void routeNavigator.push('/?segment=list')}
        >
          К списку блюд
        </Button>
      }
    >
      Заказ можно оформить в разделе «Блюда»
    </Placeholder>
  );
};

export default EmptyOrders;
