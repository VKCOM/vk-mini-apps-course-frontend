import bridge from '@vkontakte/vk-bridge';

/*
  Модуль 4. Разработка Урок 11. Работа с API ВКонтакте в клиентской части приложения #M4L11.
  VKWebAppGetAuthToken показывает окно с запросом прав доступа у пользователя и возвращает ключ доступа для работы с API.
*/
export const getAccessToken = async () => {
  try {
    const data = await bridge.send('VKWebAppGetAuthToken', {
      app_id: Number(import.meta.env.VITE_APP_ID),
      scope: 'friends',
    });
    return data.access_token;
  } catch (error) {
    console.log('Ошибка получения access_token:', error);
  }
};
