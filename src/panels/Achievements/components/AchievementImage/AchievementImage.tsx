import { Image, classNames } from '@vkontakte/vkui';
import { Icon20LockCircleFillBlack } from '@vkontakte/icons';

import styles from './AchievementImage.module.css';

type Props = {
  url: string;
  isDisabled: boolean;
};

const AchievementImage = ({ url, isDisabled }: Props) => (
  <Image
    src={url}
    size={88}
    className={classNames(isDisabled && styles.disabled)}
  >
    {isDisabled && (
      <Image.Badge>
        <Icon20LockCircleFillBlack width={24} height={24} />
      </Image.Badge>
    )}
  </Image>
);

export default AchievementImage;
