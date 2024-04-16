import { AppPanelSpinner, NetworkError } from 'components';
import { DishList, DishMap } from 'panels/Dishes/components';
import { ESegmentControl, ETab } from 'panels/Dishes/consts';
import { TDish } from 'panels/Dishes/types';

type Props = {
  isLoading: boolean;
  error: Error | null;
  currentDishes: TDish[];
  segment: ESegmentControl;
  tab: ETab;
  loadDishes: () => void;
};

const PanelContent = ({
  isLoading,
  error,
  currentDishes,
  segment,
  tab,
  loadDishes,
}: Props) => {
  if (isLoading) {
    return <AppPanelSpinner />;
  }

  if (error) {
    return <NetworkError action={loadDishes} />;
  }

  if (segment === ESegmentControl.MAP) {
    return <DishMap dishes={currentDishes} />;
  }

  return <DishList dishes={currentDishes} tab={tab} />;
};

export default PanelContent;
