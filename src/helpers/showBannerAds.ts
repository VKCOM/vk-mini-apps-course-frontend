import bridge, { BannerAdLocation } from '@vkontakte/vk-bridge';

export const showBannerAds = async () => {
  try {
    await bridge.send('VKWebAppShowBannerAd', {
      banner_location: BannerAdLocation.BOTTOM,
    });
  } catch (err) {
    console.log('Ошибка выполнения VKWebAppShowBannerAd:', err);
  }
};
