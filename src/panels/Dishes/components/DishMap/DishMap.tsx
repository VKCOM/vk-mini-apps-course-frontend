import { useRef, useContext } from 'react';
import { Div } from '@vkontakte/vkui';

import { AppPanelSpinner, OrderBanner } from 'components';
import { useVkMap } from 'hooks';
import { DataContext } from 'context/data';
import { DishMapError, MapMarker } from 'panels/Dishes/components';
import { TDish } from 'panels/Dishes/types';

import styles from './DishMap.module.css';

type Props = {
  dishes: TDish[];
};

const DishMap = ({ dishes }: Props) => {
  const dataContext = useContext(DataContext);
  const mapRef = useRef<HTMLDivElement>(null);
  const { mapError, isLoading, storedMapEntity } = useVkMap(mapRef);
  const orderInProgress = dataContext?.data?.orderInProgress;

  if (mapError) {
    return <DishMapError />;
  }

  return (
    <div className={styles.map} ref={mapRef}>
      {isLoading ? (
        <AppPanelSpinner />
      ) : (
        <>
          {orderInProgress && (
            <Div>
              <OrderBanner {...orderInProgress} />
            </Div>
          )}
          {dishes.map((dish) => (
            <MapMarker dish={dish} key={dish.id} map={storedMapEntity} />
          ))}
        </>
      )}
    </div>
  );
};

export default DishMap;
