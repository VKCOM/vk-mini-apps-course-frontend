import { useState, Dispatch, SetStateAction } from 'react';
import {
  Group,
  SimpleCell,
  Title,
  Text,
  Separator,
  Spacing,
} from '@vkontakte/vkui';

import { formatWithRubles, showNativeAds } from 'helpers';
import { AdsBanner } from 'panels/Order/components';

import styles from './OrderPrice.module.css';

type Props = {
  price: number;
  initialPrice: number;
  setPrice: Dispatch<SetStateAction<number>>;
  isDisabled: boolean;
};

const DISCOUNT = 20; // 20% discount for ad view

const OrderPrice = ({ price, initialPrice, setPrice, isDisabled }: Props) => {
  const [adVisible, setAdVisible] = useState(true);
  const [isAdShown, setAdShown] = useState(false);
  const [adError, setAdError] = useState('');

  const onAdShow = () => {
    const triggerShowNativeAds = async () => {
      await showNativeAds(
        () => {
          setPrice(Number(Math.ceil(price * ((100 - DISCOUNT) / 100))));
          setAdVisible(false);
          setAdShown(true);
        },
        () => {
          setAdError('Реклама не найдена');
        },
      );
    };
    triggerShowNativeAds();
  };
  return (
    <>
      <Separator wide />
      <Spacing size={12} />
      <Group header={<Title level="3">Оплата</Title>} mode="plain">
        <SimpleCell
          disabled
          className={styles.container}
          indicator={
            isAdShown ? (
              <s>{formatWithRubles(initialPrice)}</s>
            ) : (
              formatWithRubles(price)
            )
          }
          after={
            isAdShown && (
              <Text className={styles.newPrice}>{formatWithRubles(price)}</Text>
            )
          }
          subtitle={`Скидка ${DISCOUNT}% за просмотр рекламы`}
        >
          Цена
        </SimpleCell>
        <AdsBanner
          isVisible={adVisible}
          onAdShow={onAdShow}
          discount={DISCOUNT}
          error={adError}
          isDisabled={isDisabled}
        />
      </Group>
    </>
  );
};

export default OrderPrice;
