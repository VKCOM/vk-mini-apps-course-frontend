import { useEffect, useState, useContext } from 'react';
import { Panel, PanelHeader, PanelProps } from '@vkontakte/vkui';
import { useSearchParams } from '@vkontakte/vk-mini-apps-router';

import { useGetDishes } from 'hooks';
import { DataContext } from 'context/data';

import { DishTabs, DishSegment, PanelContent } from './components';
import { ESegmentControl, ETab } from './consts';
import { TDish } from './types';

const DishesPanel = ({ id }: PanelProps) => {
  const [params] = useSearchParams();
  const [tab, setTab] = useState(
    params.get('tab') ? ETab.FAVORITES : ETab.RESTAURANTS,
  );
  const [segment, setSegment] = useState(
    params.get('segment') ? ESegmentControl.LIST : ESegmentControl.MAP,
  );
  const [currentDishes, setCurrentDishes] = useState<TDish[]>([]);
  const [dishes, setDishes] = useState<TDish[]>([]);

  const dataContext = useContext(DataContext);
  const contextDishes = dataContext?.data?.dishes;

  const { isLoading, error, loadDishes } = useGetDishes();

  useEffect(() => {
    if (!contextDishes) {
      return;
    }

    setDishes(contextDishes);
  }, [contextDishes]);

  useEffect(() => {
    if (tab === ETab.FAVORITES) {
      const favouriteDishes = dishes.filter((dish) => dish.is_favourite);
      setCurrentDishes(favouriteDishes);
    } else {
      setCurrentDishes(dishes);
    }
  }, [segment, tab, dishes]);

  useEffect(() => {
    params.get('segment')
      ? setSegment(ESegmentControl.LIST)
      : setSegment(ESegmentControl.MAP);

    params.get('tab') ? setTab(ETab.FAVORITES) : setTab(ETab.RESTAURANTS);
  }, [params]);

  return (
    <Panel id={id}>
      <PanelHeader fixed>Блюдо дня</PanelHeader>
      <DishTabs tab={tab} />
      <PanelContent
        isLoading={isLoading}
        error={error}
        currentDishes={currentDishes}
        segment={segment}
        tab={tab}
        loadDishes={loadDishes}
      />
      <DishSegment segment={segment} />
    </Panel>
  );
};

export default DishesPanel;
