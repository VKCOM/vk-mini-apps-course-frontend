import { TDishOption } from 'panels/Dishes/types';

export const parseDishOptions = (options: TDishOption[]) => {
  const selectedOptionsNames = options
    .filter((opt) => opt.is_selected)
    .map((opt) => opt.name);

  if (!selectedOptionsNames.length) {
    return 'Без дополнительных опций';
  }

  return selectedOptionsNames.join(',');
};
