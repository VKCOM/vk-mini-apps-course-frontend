import bridge, { TransactionResult } from '@vkontakte/vk-bridge';

export const useBridgeSubscribePaymentResult = (
  onSuccess: (data: TransactionResult) => void,
  onFail: () => void,
) => {
  /*
    Модуль 4. Разработка Урок 6. Подписка на события VK Bridge и их особенности #M4L6.
    bridge.subscribe - подписка на события библиотеки VK Bridge.
  */
  bridge.subscribe((event) => {
    if (!event.detail) {
      return;
    }

    /*
        Модуль 7. Монетизация Урок 7. Продажа цифровых  и физических товаров: реализация #M7L7.
        Обработка результатов операции оплаты заказа.
      */
    switch (event.detail.type) {
      case 'VKWebAppOpenPayFormResult':
        // @ts-expect-error TS2322: VKWebAppOpenPayFormResult wrong type definition
        onSuccess(event.detail.data);
        break;
      case 'VKWebAppOpenPayFormFailed':
        onFail();
        break;
      default:
        break;
    }
  });
};
