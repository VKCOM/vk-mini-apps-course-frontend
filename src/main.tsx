import ReactDOM from 'react-dom/client';
import vkBridge from '@vkontakte/vk-bridge';
import { AppConfig } from './AppConfig.tsx';
import eruda from 'eruda';

vkBridge.send('VKWebAppInit');

ReactDOM.createRoot(document.getElementById('root')!).render(<AppConfig />);

if (import.meta.env.MODE === 'development') {
  eruda.init();
}
