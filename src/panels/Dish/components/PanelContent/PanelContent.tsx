import { AppPanelSpinner, NetworkError } from 'components';
import { DishContent } from 'panels/Dish/components';
import { TDish } from 'panels/Dishes/types';

type Props = {
  isLoading: boolean;
  error: Error | null;
  dish: TDish | null;
  loadDish: () => void;
};

const PanelContent = ({ isLoading, error, dish, loadDish }: Props) => {
  if (isLoading) {
    return <AppPanelSpinner />;
  }

  if (error || !dish) {
    return <NetworkError action={loadDish} />;
  }

  return <DishContent dishInfo={dish} />;
};

export default PanelContent;
