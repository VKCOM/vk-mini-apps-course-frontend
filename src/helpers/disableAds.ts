import bridge, { ErrorData } from '@vkontakte/vk-bridge';

/*
  Модуль 7. Монетизация Урок 5. Продажа виртуальных ценностей: разовая оплата и подписки #M7L5.
  VKWebAppShowSubscriptionBox открывает диалоговое окно покупки подписки, отказа от неё 
  или восстановления подписки в приложении.
  VKWebAppShowOrderBox открывает окно покупки виртуальной ценности в мини-приложении или игре.
*/
export const disableAds = async (
  productId: string,
  onSuccess: () => void,
  onFail: () => void,
  setDisabled: (arg: boolean) => void,
) => {
  try {
    if (productId === 'subscribe_vote') {
      await bridge.send('VKWebAppShowSubscriptionBox', {
        action: 'create',
        item: productId,
      });
    } else {
      await bridge.send('VKWebAppShowOrderBox', {
        type: 'item',
        item: productId,
      });
    }
    onSuccess();
  } catch (err) {
    console.log('Ошибка отключения рекламы:', err);
    const { error_data } = err as ErrorData;
    if (error_data.error_code !== 4) {
      onFail();
    }
  } finally {
    setDisabled(false);
  }
};
