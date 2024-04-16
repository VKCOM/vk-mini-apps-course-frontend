import {
  FixedLayout,
  ButtonGroup,
  Button,
  Separator,
  Div,
} from '@vkontakte/vkui';
import { useHref } from '@vkontakte/vk-mini-apps-router';

import { ShareButton } from 'components';
import { getLinkToApp, formatWithRubles } from 'helpers';

type Props = {
  price: number;
  startCheckout: () => void;
};

const DishFooter = ({ price, startCheckout }: Props) => {
  const pageHref = useHref('');
  /*
    Модуль 4. Разработка Урок 2. Знакомство с VKUI #M4L2.
    FixedLayout.
  */
  return (
    <FixedLayout vertical="bottom" filled>
      <Separator wide />
      <Div>
        <ButtonGroup stretched>
          <Button size="l" stretched onClick={startCheckout}>
            Заказать за {formatWithRubles(price)}
          </Button>
          <ShareButton link={getLinkToApp(pageHref)} />
        </ButtonGroup>
      </Div>
    </FixedLayout>
  );
};

export default DishFooter;
