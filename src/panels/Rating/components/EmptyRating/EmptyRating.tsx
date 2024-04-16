import { Placeholder } from '@vkontakte/vkui';
import { Icon56UserAddOutline } from '@vkontakte/icons';

const EmptyRating = () => {
  return (
    <Placeholder
      stretched
      icon={<Icon56UserAddOutline />}
      header="Пригласите друзей"
    >
      Вы можете пригласить друзей и отслеживать прогресс друг друга
    </Placeholder>
  );
};

export default EmptyRating;
