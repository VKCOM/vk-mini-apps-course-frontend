import { useContext } from 'react';
import {
  Group,
  SimpleCell,
  MiniInfoCell,
  Footnote,
  SplitLayout,
  SplitCol,
  Div,
  Link,
  classNames,
  useAdaptivityConditionalRender,
} from '@vkontakte/vkui';
import { Icon24CupOutline, Icon24PlaceOutline } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { DataContext } from 'context/data';
import { DishOptions, DishImage, DishHeader } from 'panels/Dish/components';
import { TDish, TDishOption } from 'panels/Dishes/types';

import styles from './DishInfo.module.css';

type Props = {
  info: TDish;
  options: TDishOption[];
  handleOptionChange: (id: number) => void;
};

/*
  Модуль 4. Разработка Урок 2. Знакомство с VKUI #M4L2.
  SplitLayout, SplitCol, Div, Group, MiniInfoCell, Link, SimpleCell.
*/
const DishInfo = ({ info, handleOptionChange, options }: Props) => {
  const routeNavigator = useRouteNavigator();
  const { bonus, description, full_img, id, restaurant } = info;
  /*
    Модуль 4. Разработка Урок 7. Вёрстка под vk.com и m.vk.com #M4L7.
    Получение параметра адаптивности sizeX.
  */
  const { sizeX } = useAdaptivityConditionalRender();

  const dataContext = useContext(DataContext);
  const orderInProgress = dataContext?.data?.orderInProgress;
  const hasOrderInProgress = Boolean(orderInProgress);

  const navigateToDishCard = () => {
    void routeNavigator.push(`/dish-card/${id}`);
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.withBanner]: hasOrderInProgress,
      })}
    >
      <SplitLayout>
        {sizeX.regular && (
          <SplitCol className={sizeX.regular.className}>
            <Div>
              <DishImage url={full_img} />
            </Div>
          </SplitCol>
        )}
        <SplitCol>
          {sizeX.compact && (
            <div className={sizeX.compact.className}>
              <DishImage url={full_img} />
            </div>
          )}
          <Group mode="plain" header={<DishHeader {...info} />}>
            <MiniInfoCell before={<Icon24PlaceOutline />} mode="add" expandable>
              <Link
                onClick={navigateToDishCard}
                target="_blank"
                className={styles.restaurantName}
              >
                {restaurant.name}
              </Link>
            </MiniInfoCell>
            <MiniInfoCell before={<Icon24CupOutline />}>
              {bonus} за заказ
            </MiniInfoCell>
            <SimpleCell multiline hasActive={false} hasHover={false} disabled>
              <Footnote>{description}</Footnote>
            </SimpleCell>
            <DishOptions
              handleOptionChange={handleOptionChange}
              options={options}
            />
          </Group>
        </SplitCol>
      </SplitLayout>
    </div>
  );
};

export default DishInfo;
