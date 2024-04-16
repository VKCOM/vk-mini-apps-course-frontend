import { Group } from '@vkontakte/vkui';

import styles from './DishImage.module.css';

type Props = {
  url: string;
};

/*
  Модуль 4. Разработка Урок 2. Знакомство с VKUI #M4L2.
  Group.
*/
const DishImage = ({ url }: Props) => (
  <Group mode="plain" className={styles.imgContainer} separator="hide">
    <img src={url} className={styles.img} />
  </Group>
);

export default DishImage;
