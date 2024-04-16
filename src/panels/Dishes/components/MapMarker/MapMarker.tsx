import { useEffect, useRef } from 'react';
import mmrgl from 'mmr-gl';
import { Icon24Place, Icon20LikeCircleFillRed } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { TDish } from 'panels/Dishes/types';

import styles from './MapMarker.module.css';

type Props = {
  dish: TDish;
  map: mmrgl.Map | undefined;
};

const MapMarker = ({ dish, map }: Props) => {
  const markerRef = useRef<HTMLDivElement>(null);
  const routeNavigator = useRouteNavigator();

  const openDishModal = () => {
    /*
      Модуль 4. Разработка Урок 4. Модальные окна #M4L4.
      Отображение модального окна с сохранением query-параметров в адресе.
    */
    void routeNavigator.push(`/dish-card/${dish.id}`, {
      keepSearchParams: true,
    });
  };

  useEffect(() => {
    if (!map || !markerRef.current) {
      return;
    }
    /*
      Модуль 4. Разработка Урок 14. Работа с VK Картами #M4L14.
      Создаём новый маркер для нашей карты. Конструктор new mmrgl.Marker принимает ссылку на элемент в разметке, 
      который будет использоваться в качестве маркера. Далее мы устанавливаем координаты для маркера 
      и добавляем его на нашу карту.
    */
    const mark = new mmrgl.Marker(markerRef.current)
      .setLngLat([dish.restaurant.cords.lng, dish.restaurant.cords.lat])
      .addTo(map);

    return () => {
      mark.remove();
    };
  }, [map, dish]);

  return (
    <div>
      <div ref={markerRef} className={styles.marker} onClick={openDishModal}>
        <Icon24Place />
        {dish.is_favourite && (
          <div className={styles.iconContainer}>
            <Icon20LikeCircleFillRed />
          </div>
        )}
      </div>
    </div>
  );
};

export default MapMarker;
