import {
  SimpleCell,
  Avatar,
  useAdaptivityConditionalRender,
  Platform,
  usePlatform,
} from '@vkontakte/vkui';

import { joinWithDots, parseSubscriptionDate } from 'helpers';
import { plural } from 'utils';
import { NotificationButton } from 'panels/Profile/components';
import { TProfile } from 'panels/Profile/types';

const ProfileInfo = ({
  id,
  lvl,
  orders_count,
  photo_100,
  first_name,
  last_name,
  is_ads_enabled,
  ads_disabled_until,
  notifications_count,
}: TProfile) => {
  const { sizeX } = useAdaptivityConditionalRender();
  const platform = usePlatform();

  const isMobile =
    sizeX.compact &&
    (platform === Platform.ANDROID || platform === Platform.IOS);

  return (
    <SimpleCell
      before={<Avatar size={48} src={photo_100} />}
      subtitle={joinWithDots(
        `${lvl} уровень`,
        `${orders_count} ${plural(
          ['заказ', 'заказа', 'заказов'],
          orders_count,
        )}`,
      )}
      extraSubtitle={
        !is_ads_enabled && parseSubscriptionDate(ads_disabled_until)
      }
      after={
        !isMobile && (
          <NotificationButton
            userId={id}
            notifications_count={notifications_count}
          />
        )
      }
    >
      {first_name} {last_name}
    </SimpleCell>
  );
};

export default ProfileInfo;
