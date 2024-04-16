import bridge from '@vkontakte/vk-bridge';

/*
  Модуль 4. Разработка Урок 16. Работа с VK Storage #M4L16.
  VKWebAppStorageGet возвращает значения переменных,
  названия которых переданы в параметре keys.
*/
export const appStorageGet = async (keys: string[]) =>
  bridge
    .send('VKWebAppStorageGet', {
      keys,
    })
    .catch(() => {
      console.log(`Ошибка получения ключей ${keys}`);
    });
