import { ChangeEvent } from 'react';
import { FormItem, Input } from '@vkontakte/vkui';

import { EAddress } from 'panels/Order/components/AddressModal/const';

import styles from './ModalInput.module.css';

type Props = {
  name: EAddress;
  onChange: (e: ChangeEvent<HTMLInputElement>, name: EAddress) => void;
  value: string;
  label: string;
  isError: boolean;
};

const ModalInput = ({ name, onChange, value, label, isError }: Props) => {
  const isInputInvalid = isError && !value;
  return (
    <FormItem
      htmlFor={name}
      top={label}
      className={styles.formItem}
      status={isInputInvalid ? 'error' : 'default'}
    >
      <Input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e, name)}
      />
    </FormItem>
  );
};

export default ModalInput;
