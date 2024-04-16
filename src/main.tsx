import ReactDOM from 'react-dom/client';
import vkBridge from '@vkontakte/vk-bridge';
import eruda from 'eruda';

import { AppConfig } from './AppConfig';

/*
  Модуль 4. Разработка Урок 5. Основы работы с VK Bridge #M4L5.
  VKWebAppInit - первое событие, которое ваше приложение должно отправить приложению ВКонтакте для начала работы с VK Bridge.
*/
vkBridge.send('VKWebAppInit');

ReactDOM.createRoot(document.getElementById('root')!).render(<AppConfig />);

if (import.meta.env.MODE === 'development') {
  eruda.init();
}
