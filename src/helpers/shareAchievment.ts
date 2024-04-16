import bridge from '@vkontakte/vk-bridge';

/*
  Модуль 4. Разработка Урок 17. Шаринг из приложения #M4L17.
  VKWebAppShowStoryBox открывает редактор историй и выполняет
  публикацию новой истории.
*/
export const shareAchievment = async (storyImg: string) => {
  try {
    await bridge.send('VKWebAppShowStoryBox', {
      background_type: 'image',
      url: storyImg,
    });
  } catch (err) {
    console.log('Ошибка выполнения VKWebAppShowStoryBox:', err);
  }
};
