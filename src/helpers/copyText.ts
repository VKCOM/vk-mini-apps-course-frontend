import bridge from '@vkontakte/vk-bridge';

export const copyText = async (text: string) => {
  try {
    await bridge.send('VKWebAppCopyText', { text: text });
  } catch (err) {
    console.log('Ошибка выполнения VKWebAppCopyText:', err);
  }
};
