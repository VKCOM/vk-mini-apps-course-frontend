import {
  FixedLayout,
  Button,
  Separator,
  Div,
  ButtonGroup,
} from '@vkontakte/vkui';

import { formatWithRubles } from 'helpers';

type Props = {
  price: number;
  isDisabled: boolean;
  isCancelDisabled: boolean;
  checkout: () => void;
  onCancel: () => void;
};

const OrderFooter = ({
  price,
  isDisabled,
  isCancelDisabled,
  checkout,
  onCancel,
}: Props) => (
  <FixedLayout vertical="bottom" filled>
    <Separator wide />
    <Div>
      <ButtonGroup mode="vertical" stretched>
        <Button size="l" stretched disabled={isDisabled} onClick={checkout}>
          Заказать за {formatWithRubles(price)}
        </Button>
        <Button
          size="l"
          stretched
          disabled={isCancelDisabled}
          onClick={onCancel}
        >
          Отменить заказ
        </Button>
      </ButtonGroup>
    </Div>
  </FixedLayout>
);

export default OrderFooter;
