import { useContext, Dispatch, SetStateAction } from 'react';
import {
  Group,
  Header,
  Title,
  FormLayoutGroup,
  FormItem,
  Input,
  Checkbox,
  Spacing,
  Separator,
} from '@vkontakte/vkui';
import { Icon20PlaceOutline } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { parseAddress, formatWithRubles } from 'helpers';
import { DataContext } from 'context/data';
import { EModal } from 'consts/modals';
import { TAddress } from 'panels/Order/types';
import { TExtraOption } from 'panels/Dishes/types';

import styles from './OrderContent.module.css';

type Props = {
  deliveryPrice: number;
  deliveryTime: string;
  extraOptions: TExtraOption[] | null;
  deliveryAddress: TAddress | null;
  setExtraOptions: Dispatch<SetStateAction<TExtraOption[] | null>>;
  isDisabled: boolean;
};

const OrderContent = ({
  deliveryPrice,
  deliveryTime,
  extraOptions,
  deliveryAddress,
  setExtraOptions,
  isDisabled,
}: Props) => {
  const dataContext = useContext(DataContext);
  const address = parseAddress(deliveryAddress);
  const routeNavigator = useRouteNavigator();

  const handleOptionChange = (id: number) => {
    if (extraOptions) {
      const currentOptions = [...extraOptions];

      currentOptions[id] = {
        ...currentOptions[id],
        is_selected: !currentOptions[id].is_selected,
      };
      setExtraOptions(currentOptions);
    }
  };

  const handleAddressBtnClick = () => {
    if (!dataContext || isDisabled) {
      return;
    }

    dataContext.setData({
      ...dataContext.data,
      address: deliveryAddress,
    });
    /*
      Модуль 4. Разработка Урок 4. Модальные окна #M4L4.
      Отображение модального окна, у которого нет собственного адреса.
    */
    void routeNavigator.showModal(EModal.ORDER_ADDRESS);
  };

  return (
    <>
      <Spacing size={12} />
      <Separator wide />
      <Group
        mode="plain"
        separator="hide"
        header={
          <Header
            className={styles.header}
            aside={formatWithRubles(deliveryPrice)}
          >
            <Title level="3">Доставка {deliveryTime} минут</Title>
          </Header>
        }
      >
        <Spacing size={12} />
        <FormLayoutGroup>
          <FormItem
            htmlFor="address"
            disabled={isDisabled}
            className={styles.address}
            top="Адрес"
            noPadding
            onClick={handleAddressBtnClick}
          >
            <Input
              id="address"
              type="text"
              name="address"
              value={address}
              disabled
              placeholder="Укажите адрес"
              after={<Icon20PlaceOutline />}
            />
          </FormItem>
          <Spacing size={12} />
          {extraOptions?.length &&
            extraOptions.map((item, index) => (
              <FormItem key={item.id} noPadding>
                <Checkbox
                  onClick={() => handleOptionChange(index)}
                  checked={item.is_selected}
                  disabled={isDisabled}
                >
                  {item.name}
                </Checkbox>
              </FormItem>
            ))}
        </FormLayoutGroup>
      </Group>
    </>
  );
};

export default OrderContent;
