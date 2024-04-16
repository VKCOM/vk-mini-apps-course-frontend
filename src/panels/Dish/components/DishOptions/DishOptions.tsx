import { Group, FormLayoutGroup, Checkbox, FormItem } from '@vkontakte/vkui';

import { formatWithRubles } from 'helpers';
import { TDishOption } from 'panels/Dishes/types';
import styles from './DishOptions.module.css';

type Props = {
  options: TDishOption[];
  handleOptionChange: (id: number) => void;
};

/*
  Модуль 4. Разработка Урок 2. Знакомство с VKUI #M4L2.
  Group, FormLayoutGroup, FormItem, Checkbox.
*/
const DishOptions = ({ options, handleOptionChange }: Props) => (
  <Group mode="plain">
    <FormLayoutGroup>
      <FormItem top="Настроить блюдо">
        {options.map((item, index) => (
          <Checkbox
            onClick={() => handleOptionChange(index)}
            checked={item.is_selected}
            key={item.id}
            hasActive={false}
            hasHover={false}
          >
            {item.name}{' '}
            <span className={styles.price}>{formatWithRubles(item.price)}</span>
          </Checkbox>
        ))}
      </FormItem>
    </FormLayoutGroup>
  </Group>
);

export default DishOptions;
