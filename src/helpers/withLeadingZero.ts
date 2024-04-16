export const withLeadingZero = (value: number) => {
  return value >= 10 ? value : `0${value}`;
};
