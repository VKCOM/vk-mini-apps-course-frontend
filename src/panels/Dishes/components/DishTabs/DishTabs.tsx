import { Tabs, TabsItem, FixedLayout } from '@vkontakte/vkui';
import { useSearchParams } from '@vkontakte/vk-mini-apps-router';

import { ETab } from 'panels/Dishes/consts';

import styles from './DishTabs.module.css';

type Props = {
  tab: ETab;
};

const DishTabs = ({ tab }: Props) => {
  const [params, setParams] = useSearchParams();

  const handleTabChange = (value: ETab) => {
    value === ETab.FAVORITES
      ? params.set('tab', ETab.FAVORITES)
      : params.delete('tab');
    setParams(params);
  };

  return (
    <FixedLayout vertical="top" className={styles.container}>
      <Tabs>
        <TabsItem
          selected={tab === ETab.RESTAURANTS}
          onClick={() => handleTabChange(ETab.RESTAURANTS)}
          id="tab-restaurants"
        >
          Все
        </TabsItem>
        <TabsItem
          selected={tab === ETab.FAVORITES}
          onClick={() => handleTabChange(ETab.FAVORITES)}
          id="tab-favorites"
        >
          Избранное
        </TabsItem>
      </Tabs>
    </FixedLayout>
  );
};

export default DishTabs;
