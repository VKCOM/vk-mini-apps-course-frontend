import { useState, ChangeEvent, useContext } from 'react';
import {
  ModalPageHeader,
  FormItem,
  Button,
  Group,
  FormLayoutGroup,
  Spacing,
  Textarea,
} from '@vkontakte/vkui';

import { AppModalCloseBtn } from 'components';
import { DataContext } from 'context/data';
import { ModalInput } from 'panels/Order/components';
import { defaultAddress, EAddress } from './const';

type Props = {
  onClose: () => void;
};

const AddressModal = ({ onClose }: Props) => {
  const dataContext = useContext(DataContext);
  const deliveryAddress = dataContext?.data?.address;

  const [address, setAdress] = useState(deliveryAddress || defaultAddress);
  const [isAnyFieldEmpty, setAnyFieldEmpty] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: EAddress,
  ) => {
    setAdress((prevState) => {
      const currentAddress = { ...prevState };
      currentAddress[name] = e.target.value;

      return currentAddress;
    });
  };

  const handleSaveBtn = () => {
    const { apartment, city, entrance, floor, house, street } = address;

    if (!apartment || !city || !entrance || !floor || !house || !street) {
      setAnyFieldEmpty(true);
      return;
    }

    if (!dataContext?.data) {
      return;
    }

    dataContext.setData({
      ...dataContext.data,
      address: address,
    });

    setAnyFieldEmpty(false);
    onClose();
  };

  return (
    <>
      <ModalPageHeader after={<AppModalCloseBtn onClose={onClose} />}>
        Адрес
      </ModalPageHeader>
      <Group>
        <FormLayoutGroup>
          <ModalInput
            onChange={handleInputChange}
            value={address.city}
            name={EAddress.CITY}
            label="Город"
            isError={isAnyFieldEmpty}
          />
          <FormLayoutGroup mode="horizontal">
            <ModalInput
              onChange={handleInputChange}
              value={address.street}
              name={EAddress.STREET}
              label="Улица"
              isError={isAnyFieldEmpty}
            />
            <ModalInput
              onChange={handleInputChange}
              value={address.house}
              name={EAddress.HOUSE}
              label="Дом"
              isError={isAnyFieldEmpty}
            />
          </FormLayoutGroup>
          <FormLayoutGroup mode="horizontal">
            <ModalInput
              onChange={handleInputChange}
              value={address.apartment}
              name={EAddress.APARTMENT}
              label="Квартира"
              isError={isAnyFieldEmpty}
            />
            <ModalInput
              onChange={handleInputChange}
              value={address.entrance}
              name={EAddress.ENTRANCE}
              label="Подъезд"
              isError={isAnyFieldEmpty}
            />
            <ModalInput
              onChange={handleInputChange}
              value={address.floor}
              name={EAddress.FLOOR}
              label="Этаж"
              isError={isAnyFieldEmpty}
            />
          </FormLayoutGroup>
          <FormItem htmlFor={EAddress.COMMENT} top="Комментарий">
            <Textarea
              name={EAddress.COMMENT}
              value={address.comment}
              onChange={(e) => handleInputChange(e, EAddress.COMMENT)}
            />
          </FormItem>
          <Spacing size={12} />
          <FormItem>
            <Button size="l" onClick={handleSaveBtn} stretched mode="primary">
              Сохранить
            </Button>
          </FormItem>
        </FormLayoutGroup>
      </Group>
    </>
  );
};

export default AddressModal;
