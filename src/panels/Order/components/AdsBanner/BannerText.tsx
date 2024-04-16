type Props = {
  discount: number;
  error?: string;
};

const BannerText = ({ discount, error }: Props) => {
  return (
    <span>
      Посмотрите рекламу и получите скидку {discount}%{' '}
      {error && error.length > 0 && (
        <span>
          <br />
          {error}
        </span>
      )}
    </span>
  );
};

export default BannerText;
