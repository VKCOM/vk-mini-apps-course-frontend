import bridge from '@vkontakte/vk-bridge';

export const enableSwipe = async () => {
  /*
    Модуль 4. Разработка Урок 6. Подписка на события VK Bridge и их особенности #M4L6.
    bridge.supports проверяет, поддерживается ли событие на текущей платформе
  */
  if (!bridge.supports('VKWebAppSetSwipeSettings')) {
    return;
  }

  try {
    await bridge.send('VKWebAppSetSwipeSettings', { history: true });
  } catch (err) {
    console.log('Ошибка выполнения VKWebAppSetSwipeSettings:', err);
  }
};
