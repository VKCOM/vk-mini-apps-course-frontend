import { FormItem, FormLayoutGroup, Radio, RadioGroup } from '@vkontakte/vkui';

type Props = {
  isOrdersPublic: boolean;
  onRadioItemClick: () => void;
};

const ConfirmShareOrderModalContent = ({
  isOrdersPublic,
  onRadioItemClick,
}: Props) => (
  <FormLayoutGroup>
    <FormItem>
      <RadioGroup>
        <Radio
          value="Включено"
          checked={isOrdersPublic}
          description="Показываю свои заказы и вижу заказы пользователей"
          onChange={onRadioItemClick}
        >
          Включено
        </Radio>
        <Radio
          value="Отключено"
          checked={!isOrdersPublic}
          description="Не показываю свои заказы и не вижу заказы пользователей"
          onChange={onRadioItemClick}
        >
          Отключено
        </Radio>
      </RadioGroup>
    </FormItem>
  </FormLayoutGroup>
);

export default ConfirmShareOrderModalContent;
