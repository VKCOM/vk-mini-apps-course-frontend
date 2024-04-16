import bridge from '@vkontakte/vk-bridge';

/*
  Модуль 4. Разработка Урок 16. Работа с VK Storage #M4L16.
  VKWebAppStorageSet задаёт значение переменной, название которой передано в метод,
  и помещает её в хранилище VK Storage. Пары «ключ — значение» могут храниться бессрочно
  и не привязаны к устройству или браузеру пользователя
*/
export const appStorageSet = async (key: string, value: string) =>
  bridge
    .send('VKWebAppStorageSet', {
      key,
      value,
    })
    .catch(() => {
      console.log(`Ошибка записи ключа ${key}, значение ${value}`);
    });
