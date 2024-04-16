import { Image, SimpleCell, Footnote } from '@vkontakte/vkui';
import {
  Icon12Favorite,
  Icon24ChevronCompactRight,
  Icon20LikeCircleFillRed,
  Icon28LikeFillRed,
} from '@vkontakte/icons';

import { joinWithDots, formatWithRubles } from 'helpers';
import { plural } from 'utils';
import { ETab } from 'panels/Dishes/consts';
import { TDish } from 'panels/Dishes/types';

import styles from './Dish.module.css';

type Props = {
  dish: TDish;
  navigateToDish?: (id: number) => void;
  tab?: ETab;
  extraOptions?: string;
};

const Dish = ({ dish, tab, navigateToDish, extraOptions }: Props) => {
  const { id, small_img, is_favourite, restaurant, price, name, bonus } = dish;

  return (
    <SimpleCell
      className={styles.cell}
      onClick={() => navigateToDish && navigateToDish(id)}
      before={
        <Image src={small_img} size={72}>
          {is_favourite && tab === ETab.RESTAURANTS && (
            <Image.Badge>
              <Icon20LikeCircleFillRed width={24} height={24} />
            </Image.Badge>
          )}
        </Image>
      }
      after={
        <>
          {dish.is_favourite && tab === ETab.FAVORITES && <Icon28LikeFillRed />}
          <Icon24ChevronCompactRight className={styles.chevronIcon} />
        </>
      }
      subtitle={
        <div className={styles.subtitle}>
          {extraOptions ? (
            <>{extraOptions}</>
          ) : (
            <>
              <Icon12Favorite fill="#FFA000" />
              &nbsp;{joinWithDots(`${restaurant.rating}`, restaurant.name)}
            </>
          )}
        </div>
      }
      extraSubtitle={
        <Footnote weight="3" className={styles.extraSubtitle}>
          {joinWithDots(
            String(formatWithRubles(price)),
            `+ ${bonus} ${plural(['уровень', 'уровня', 'уровней'], bonus)}`,
          )}
        </Footnote>
      }
    >
      {name}
    </SimpleCell>
  );
};

export default Dish;
