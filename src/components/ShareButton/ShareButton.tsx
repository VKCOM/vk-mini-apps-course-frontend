import { Button } from '@vkontakte/vkui';
import { Icon24ShareOutline } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';

type Props = {
  link: string;
};

const ShareButton = ({ link }: Props) => {
  /*
    Модуль 4. Разработка Урок 17. Шаринг из приложения #M4L17.
    VKWebAppShare показывает окно с предложением поделиться записью 
    с указанной ссылкой на своей стене, на стене сообщества, в истории или в личном сообщении.
  */
  const share = () => {
    try {
      bridge.send('VKWebAppShare', { link });
    } catch (err) {
      console.log('Ошибка выполнения VKWebAppShare:', err);
    }
  };

  return (
    <Button size="l" onClick={share} mode="secondary">
      <Icon24ShareOutline />
    </Button>
  );
};

export default ShareButton;
