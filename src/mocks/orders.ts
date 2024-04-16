import { EOrderStatus } from 'panels/Order/consts';

export const orderSteps = [
  {
    id: '0',
    img: `${import.meta.env.VITE_BACKEND_DOMAIN_URL}/storage/static/step1.png`,
    title: 'Оформление заказа не завершено',
    subtitle: 'Продолжить оформление',
    label: 'Не оформлен',
    status: EOrderStatus.NEW,
  },
  {
    id: '1',
    img: `${import.meta.env.VITE_BACKEND_DOMAIN_URL}/storage/static/step1.png`,
    title: 'Готовим ваш заказ',
    subtitle: 'Еще 30 минут',
    label: 'Готовим',
    status: EOrderStatus.CREATING,
  },
  {
    id: '2',
    img: `${import.meta.env.VITE_BACKEND_DOMAIN_URL}/storage/static/step2.png`,
    title: 'Передаём курьеру',
    subtitle: 'Еще 20 минут',
    label: 'Передаём курьеру',
    status: EOrderStatus.PACKING,
  },
  {
    id: '3',
    img: `${import.meta.env.VITE_BACKEND_DOMAIN_URL}/storage/static/step3.png`,
    title: 'Заказ едет к вам',
    subtitle: 'Еще 10 минут',
    label: 'Доставляем',
    status: EOrderStatus.DELIVERING,
  },
  {
    id: '4',
    img: '',
    title: 'Заказ доставлен',
    subtitle: '',
    label: 'Доставлен',
    status: EOrderStatus.COMPLETED,
  },
  {
    id: '5',
    img: '',
    title: 'Заказ не доставлен',
    subtitle: '',
    label: 'Заказ отменен',
    status: EOrderStatus.CANCELED,
  },
];
