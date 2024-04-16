import bridge, { EAdsFormats } from '@vkontakte/vk-bridge';

/*
  Модуль 7. Монетизация Урок 2. Реклама: подключение в мини-приложении #M7L2.
  VKWebAppCheckNativeAds проверяет, есть ли на стороне пользователя рекламные материалы,
  доступные для показа в играх или мини-приложениях. 
  VKWebAppShowNativeAds показывает рекламу пользователям в играх и мини-приложениях.
*/
export const showNativeAds = async (
  onSuccess: () => void,
  onFail: () => void,
) => {
  try {
    const data = await bridge.send('VKWebAppCheckNativeAds', {
      ad_format: EAdsFormats.REWARD,
    });

    if (data.result) {
      try {
        await bridge.send('VKWebAppShowNativeAds', {
          ad_format: EAdsFormats.REWARD,
        });
        onSuccess();
      } catch (err) {
        console.log('Ошибка выполнения VKWebAppShowNativeAds:', err);
      }
    } else {
      onFail();
    }
  } catch (err) {
    console.log('Ошибка выполнения VKWebAppCheckNativeAds:', err);
  }
};
