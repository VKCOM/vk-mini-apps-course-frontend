import bridge from '@vkontakte/vk-bridge';

import { getAccessToken } from 'helpers';

/*
  Модуль 4. Разработка Урок 11. Работа с API ВКонтакте в клиентской части приложения #M4L11.
  VKWebAppCallAPIMethod отправляет запросы к API ВКонтакте.
*/
export const vkApiFetch = async (
  method: string,
  params?: { [key: string]: unknown },
) => {
  const accessToken = await getAccessToken();
  try {
    return await bridge.send('VKWebAppCallAPIMethod', {
      method: method,
      params: {
        v: '5.199',
        access_token: accessToken ?? '',
        ...params,
      },
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
