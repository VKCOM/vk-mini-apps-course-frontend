import { useState, useMemo, ReactElement } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { ErrorSnackbar } from 'components';
import { createOrder } from 'api/orders';
import { DishInfo, DishFooter } from 'panels/Dish/components';
import { TDish, TDishOption } from 'panels/Dishes/types';

type Props = {
  dishInfo: TDish;
};

const DishContent = ({ dishInfo }: Props) => {
  const { dish_options } = dishInfo;
  const [options, setOptions] = useState(dish_options);
  const [snackbar, setSnackbar] = useState<ReactElement | null>(null);
  const routeNavigator = useRouteNavigator();

  const computedPrice = useMemo(() => {
    return options.reduce((acc: number, option: TDishOption) => {
      if (option.is_selected) {
        acc += option.price;
      }

      return acc;
    }, dishInfo.price);
  }, [options, dishInfo.price]);

  const handleOptionChange = (id: number) => {
    setOptions((prevState) => {
      const currentOptions = [...prevState];

      currentOptions[id] = {
        ...currentOptions[id],
        is_selected: !currentOptions[id].is_selected,
      };

      return currentOptions;
    });
  };

  const showErrorSnackbar = () => {
    if (snackbar) return;
    setSnackbar(<ErrorSnackbar onClose={() => setSnackbar(null)} />);
  };

  const startCheckout = async () => {
    const selectedOptionsIds = options
      .filter((option) => option.is_selected)
      .map((option) => option.id);
    /*
      Модуль 4. Разработка Урок 8. Работа с внешним API #M4L8.
      Выполнение функции, которая работает с сервером и дальнейшее использование ответа сервера.
    */
    try {
      const newOrder = await createOrder(dishInfo.id, selectedOptionsIds);

      if (!newOrder) {
        return;
      }

      void routeNavigator.push(`/order/${newOrder.id}`);
    } catch {
      showErrorSnackbar();
    }
  };

  return (
    <>
      <DishInfo
        info={dishInfo}
        options={options}
        handleOptionChange={handleOptionChange}
      />
      <DishFooter price={computedPrice} startCheckout={startCheckout} />
      {snackbar}
    </>
  );
};

export default DishContent;
