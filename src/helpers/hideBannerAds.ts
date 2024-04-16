import bridge from '@vkontakte/vk-bridge';

export const hideBannerAds = async () => {
  try {
    await bridge.send('VKWebAppHideBannerAd');
  } catch (err) {
    console.log('Ошибка выполнения VKWebAppHideBannerAd:', err);
  }
};
