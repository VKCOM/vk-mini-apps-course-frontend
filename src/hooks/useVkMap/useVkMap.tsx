import { useState, useEffect, RefObject } from 'react';
import { Appearance } from '@vkontakte/vkui';
import { useAppearance } from '@vkontakte/vk-bridge-react';
import mmrgl from 'mmr-gl';

import {
  MAP_COORDINATES,
  MAP_ZOOM,
  DARK_MAP_STYLE,
  LIGHT_MAP_STYLE,
} from './domain';

import 'mmr-gl/dist/mmr-gl.css';

/*
  Модуль 4. Разработка Урок 14. Работа с VK Картами #M4L14.
  В этом хуке мы создаем новый экземпляр карты с помощью new mmrgl.Map().
  Получаем цветовую схему из конфига нашего мини-приложения с помощью useAppearance()
  и устанавливаем цветовую схему для нашей карты. 
*/
export const useVkMap = (mapRef: RefObject<HTMLDivElement>) => {
  const [isLoading, setLoading] = useState(true);
  const [mapError, setMapError] = useState<mmrgl.ErrorEvent>();
  const [storedMapEntity, setStoredMapEntity] = useState<mmrgl.Map>();
  const appearance = useAppearance();
  const isDarkTheme = appearance === Appearance.DARK;
  const mapStyle = isDarkTheme ? DARK_MAP_STYLE : LIGHT_MAP_STYLE;

  useEffect(() => {
    if (!mapRef.current || !appearance) {
      return;
    }

    mmrgl.prewarm();
    mmrgl.accessToken = import.meta.env.VITE_VK_MAPS_ACCESS_TOKEN;
    const connectedMapEntity = new mmrgl.Map({
      container: mapRef.current,
      zoom: MAP_ZOOM,
      center: [MAP_COORDINATES.lng, MAP_COORDINATES.lat],
      style: mapStyle,
      hash: false,
    });
    connectedMapEntity.setStyle(mapStyle);
    setStoredMapEntity(connectedMapEntity);

    connectedMapEntity.on('load', () => {
      setLoading(false);
    });

    connectedMapEntity.on('error', (error) => {
      setMapError(error);
    });
  }, [appearance]);

  return { mapError, isLoading, storedMapEntity };
};
