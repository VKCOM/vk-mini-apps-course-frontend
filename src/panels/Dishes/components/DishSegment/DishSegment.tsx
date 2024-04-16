import { FixedLayout, SegmentedControl } from '@vkontakte/vkui';
import { useSearchParams } from '@vkontakte/vk-mini-apps-router';

import { ESegmentControl } from 'panels/Dishes/consts';
import { options } from './domen';

import styles from './DishSegment.module.css';

type Props = {
  segment: ESegmentControl;
};

const DishSegment = ({ segment }: Props) => {
  const [params, setParams] = useSearchParams();

  /* Модуль 4. Разработка Урок 3. Роутинг #M4L3. Установка и удаление query-параметров */
  const handleSegmentChange = (value: ESegmentControl) => {
    value === ESegmentControl.LIST
      ? params.set('segment', ESegmentControl.LIST)
      : params.delete('segment');
    setParams(params);
  };

  return (
    <FixedLayout vertical="bottom" className={styles.container}>
      <div className={styles.segment}>
        <SegmentedControl
          size="m"
          name="report-type"
          value={segment}
          onChange={(value) => handleSegmentChange(value as ESegmentControl)}
          options={options}
        />
      </div>
    </FixedLayout>
  );
};

export default DishSegment;
