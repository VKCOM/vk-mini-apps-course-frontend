import { withLeadingZero } from './withLeadingZero';

export const Months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export const parseOrderDate = (date: Date) => {
  const minutes = withLeadingZero(date.getMinutes());
  const hours = withLeadingZero(date.getHours());

  return [
    date.getDate(),
    Months[date.getMonth()],
    `в ${hours}:${minutes}`,
  ].join(' ');
};
