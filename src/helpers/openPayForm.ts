import bridge from '@vkontakte/vk-bridge';

type payFormProps = {
  amount: number;
  description: string;
  merchant_id: number;
  sign: string;
  version: number;
  data: {
    currency: 'RUB';
    merchant_data: string;
    merchant_sign: string;
    order_id: number;
    ts: number;
  };
};

/*
  Модуль 7. Монетизация Урок 7. Продажа цифровых  и физических товаров: реализация #M7L7.
  VKWebAppOpenPayForm показывает экран VK Pay для совершения платежа.
*/
export const openPayForm = async (params: payFormProps) => {
  try {
    await bridge.send('VKWebAppOpenPayForm', {
      app_id: Number(import.meta.env.VITE_APP_ID),
      action: 'pay-to-service',
      params: {
        ...params,
      },
    });
  } catch (err) {
    console.log('Ошибка выполнения VKWebAppOpenPayForm:', err);
  }
};
