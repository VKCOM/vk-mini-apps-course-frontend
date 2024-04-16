import { Tabs, TabsItem, FixedLayout } from '@vkontakte/vkui';
import { useSearchParams } from '@vkontakte/vk-mini-apps-router';

import { ETab } from 'panels/Rating/consts';

import styles from './RatingTabs.module.css';

type Props = {
  tab: ETab | null;
};

const RatingTabs = ({ tab }: Props) => {
  const [params, setParams] = useSearchParams();

  const handleTabChange = (value: ETab) => {
    value === ETab.ALL ? params.set('tab', ETab.ALL) : params.delete('tab');
    setParams(params);
  };

  return (
    <FixedLayout vertical="top" filled className={styles.container}>
      <Tabs>
        <TabsItem
          selected={tab === ETab.FRIENDS}
          onClick={() => handleTabChange(ETab.FRIENDS)}
          id={ETab.FRIENDS}
        >
          Друзья
        </TabsItem>
        <TabsItem
          selected={tab === ETab.ALL}
          onClick={() => handleTabChange(ETab.ALL)}
          id={ETab.ALL}
        >
          Все
        </TabsItem>
      </Tabs>
    </FixedLayout>
  );
};

export default RatingTabs;
