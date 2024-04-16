import { Months } from './parseOrderDate';

export const parseSubscriptionDate = (dateString: string | null) => {
  const adsDisabled = 'Реклама выключена';

  if (!dateString) {
    return adsDisabled;
  }

  const date = new Date(dateString);
  return `${adsDisabled} до ${[date.getDate(), Months[date.getMonth()]].join(
    ' ',
  )}`;
};
