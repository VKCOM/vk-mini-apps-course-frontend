# vk-mini-apps-course-frontend

В репозитории находится исходный код демонстрационного мини-приложения [Блюдо дня](https://vk.com/app51773283).  
Оно разработано в рамках обучающего видеокурса [Разработка мини-приложений ВКонтакте](https://dev.vk.com/ru/mini-apps/learning/course).

## 👨‍💻 Установка мини-приложения

1. Клонируйте репозиторий на ваше устройство.

```sh
 git clone git@github.com:VKCOM/vk-mini-apps-course-frontend.git
```

2. Перейдите в папку с проектом.

```sh
 cd vk-mini-apps-course-frontend
```

3. Установите зависимости.

```sh
 npm i
```

## 🚀 Запуск мини-приложения

1. Зарегистрируйте мини-приложение.

Чтобы эффективно работать с данной кодовой базой, вам нужно зарегистрировать новое мини-приложение ВКонтакте.

Перейдите на [портал для разработчиков](https://dev.vk.com/ru) и нажмите **Создать приложение**. Подробнее о создании мини-приложений — [в документации](https://dev.vk.com/ru/mini-apps/getting-started#Регистрация%20мини-приложения%20ВКонтакте).

2. Создайте переменные окружения.

В корне проекта создайте .env-файл и укажите:

- `app_id` — идентификатор созданного приложения, находится в [настройках](https://dev.vk.com/ru/mini-apps/management/settings#Настройки).
- `base_url` — адрес серверной части мини-приложения.
- `access_token` — ключ доступа для работы с [VK Картами](https://dev.vk.com/ru/vkmaps/general-information/general).

```sh
 VITE_APP_ID='YOUR_APP_ID'
 VITE_BACKEND_DOMAIN_URL='BACKEND_DOMAIN_URL'
 VITE_VK_MAPS_ACCESS_TOKEN='VK_MAPS_ACCESS_TOKEN'
```

3. Запустите мини-приложение локально.

Выполните команду:

```sh
 npm run start
```

Перейдите в настройки мини-приложения и включите [режим разработки](https://dev.vk.com/ru/mini-apps/management/settings#Версия%20для%20vk.com).  
В поле **URL для разработки** укажите URL, на котором работает ваше мини-приложение.  
Теперь можно запустить мини-приложение, нажав на его иконку в [списке приложений](https://vk.com/apps?act=manage).

## Запуск внутри ВКонтакте

Чтобы сделать мини-приложение доступным извне, используйте библиотеку [VK Tunnel](https://dev.vk.com/ru/libraries/tunnel).

1. Запустите VK Tunnel.

```sh
 npm run tunnel
```

Скрипт для работы библиотеки уже добавлен в package.json.

2. Следуйте инструкциям в командной строке. Когда вы получите ссылку на мини-приложение, перейдите в настройки мини-приложения и включите [режим разработки](https://dev.vk.com/ru/mini-apps/management/settings#Версия%20для%20vk.com).

3. Укажите полученную ссылку в поле **URL для разработки**.

Теперь мини-приложение доступно по ссылке vk.com/app<ID>, где ID - идентификатор вашего приложения из настроек.

Более подробную инструкцию по запуску мини-приложения внутри ВКонтакте смотрите в [документации](https://dev.vk.com/ru/mini-apps/getting-started#Запуск%20мини-приложения%20внутри%20ВКонтакте).

## 🌐 Размещение мини-приложения на хостинге

1. В файле vk-hosting-config.json в поле `app_id` укажите индентификатор вашего мини-приложения.

```
{
  "static_path": "build",
  "app_id": YOUR_APP_ID,
  "endpoints": {
	"mobile": "index.html",
	"mvk": "index.html",
	"web": "index.html"
  }
}
```

2. Соберите мини-приложение.

```sh
 npm run build
```

3. Разверните мини-приложение на хостинге.

```sh
 npm run deploy
```

В итоге вы получите бессрочную ссылку на мини-приложение.

Более подробную инструкцию по размещению мини-приложения на хостинге смотрите в [документации](https://dev.vk.com/ru/mini-apps/getting-started#Размещение%20мини-приложения%20на%20хостинге).

## 🗂️ Структура приложения

| Директория                                                                                   | Назначение                                                                                                       |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [Api](https://github.com/VKCOM/vk-mini-apps-course-frontend/tree/main/src/api)               | Реализация работы с бэкендом мини-приложения.                                                                    |
| [Components](https://github.com/VKCOM/vk-mini-apps-course-frontend/tree/main/src/components) | Общие компоненты, используемые во всем приложении.                                                               |
| [Consts](https://github.com/VKCOM/vk-mini-apps-course-frontend/tree/main/src/consts)         | Описание констант мини-приложения.                                                                               |
| [Context](https://github.com/VKCOM/vk-mini-apps-course-frontend/tree/main/src/context)       | Контекст мини-приложения, используемый для хранения данных.                                                      |
| [Helpers](https://github.com/VKCOM/vk-mini-apps-course-frontend/tree/main/src/helpers)       | Вспомогательные функции, инкапсулирующие некоторые части функционала приложения.                                 |
| [Hooks](https://github.com/VKCOM/vk-mini-apps-course-frontend/tree/main/src/hooks)           | Кастомные хуки, взаимодействующие со стейтом отдельных экранов и компонентов.                                    |
| [Mocks](https://github.com/VKCOM/vk-mini-apps-course-frontend/tree/main/src/mocks)           | Данные, используемые для рендеринга некоторых частей приложения.                                                 |
| [Panels](https://github.com/VKCOM/vk-mini-apps-course-frontend/tree/main/src/panels)         | Экраны приложения, со всеми внутренними компонентами и типами, используемые на отдельном экране мини-приложения. |
| [Utils](https://github.com/VKCOM/vk-mini-apps-course-frontend/tree/main/src/utils)           | Вспомагательные инструменты для работы мини-приложения.                                                          |

## Включение платных возможностей

В серверной части нашего мини-приложения мы реализовали оплату голосами и за денежные средства, но отключили эту возможность. Вы можете включить эти функции в вашем мини-приложении с помощью специальных флагов.

- Чтобы включить оплату голосами, установить значение поля `is_vk_pay_enabled` в `true` для профиля пользователя в серверной части мини-приложения. Станет доступна возможность отключения рекламы за голоса ВКонтакте по подписке и разово.
- Чтобы включить оплату покупок денежными средствами, установите значение поля `is_vk_pay_enabled` в `true` для пользователя в сервеной части мини-приложения. Станет доступна возможность оплаты заказа рублями.

Подробности о подключении монетизации смотрите в [модуле 7. Монетизация](https://dev.vk.com/ru/mini-apps/learning/course/7-monetization) нашего видеокурса.

## 🔎 Работа с комментариями

В коде проекта находятся коментария вида:

```sh
 Модуль 4. Разработка Урок 3. Роутинг #M4L3.
 Создание роутера и объявление маршрутов.
```

В указанных уроках видеокурса вы найдёте информацию о разработке соответствующих фрагментов кода.
В поиске по файлам используйте названия уроков или хештеги, где M4 — номер модуля, L3 - номер урока.

## 📁 Предустановленные библиотеки

| Пакет                                                                              | Назначение                                                                                                   |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [vk-bridge](https://dev.vk.com/ru/bridge/overview)                                 | Библиотека для отправки команд и обмена данными с платформой ВКонтакте.                                      |
| [VKUI](https://vkcom.github.io/VKUI/)                                              | Библиотека React-компонентов для создания мини-приложений в стиле ВКонтакте.                                 |
| [vk-bridge-react](https://www.npmjs.com/package/@vkontakte/vk-bridge-react)        | Пакет, который даёт возможность использовать события библиотеки VK Bridge в React-приложениях.               |
| [vk-mini-apps-router](https://dev.vk.com/ru/libraries/router)                      | Библиотека для маршрутизации и навигации в мини-приложениях, созданных с помощью VKUI.                       |
| [icons](https://vkcom.github.io/icons/)                                            | Набор иконок для использования в компонентах VKUI.                                                           |
| [vk-miniapps-deploy](https://dev.vk.com/ru/mini-apps/development/hosting/overview) | Пакет для размещения файлов мини-приложения на хостинге ВКонтакте.                                           |
| [vk-tunnel](https://dev.vk.com/ru/libraries/tunnel)                                | VK Tunnel предоставляет доступ к локальному серверу по протоколам HTTP, HTTPS, WebSocket и WebSocket Secure. |
| [axios](https://www.npmjs.com/package/axios)                                       | Библиотека для работы с сервером.                                                                            |
| [mmr-gl](https://www.npmjs.com/package/mmr-gl)                                     | Библиотека для работы с картами.                                                                             |
| [react](https://www.npmjs.com/package/react)                                       | Библиотека для рендеринга ui.                                                                                |
| [eruda](https://www.npmjs.com/package/eruda)                                       | Консоль для мобильного браузера.                                                                             |

## 📎 Полезные ссылки

[Портал для разработчиков](https://dev.vk.com/ru/guide)  
[Видеокурс: Разработка мини-приложений ВКонтакте](https://dev.vk.com/ru/mini-apps/learning/course)  
[Мини-приложение «Блюдо дня»](https://vk.com/app51773283)  
[Репозиторий с бэкендом приложения «Блюдо дня»](https://github.com/VKCOM/vk-mini-apps-course-backend)  
[Задайте вопрос в сообществе разработчиков VK Mini Apps](https://vk.com/vkappsdev)
