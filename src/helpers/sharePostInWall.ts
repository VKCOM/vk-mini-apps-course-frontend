import bridge from '@vkontakte/vk-bridge';
import { getLinkToApp } from 'helpers';

/*
  Модуль 4. Разработка Урок 17. Шаринг из приложения #M4L17.
  VKWebAppShowWallPostBox показывает окно с предложением разместить запись на стене пользователя.
*/
export const sharePostInWall = async () => {
  try {
    await bridge.send('VKWebAppShowWallPostBox', {
      message: 'У меня новое достижение!',
      attachments: getLinkToApp(''),
    });
  } catch (err) {
    console.log('Ошибка выполнения VKWebAppShowWallPostBox:', err);
  }
};
