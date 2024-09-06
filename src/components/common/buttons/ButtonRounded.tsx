import CustomSpin from '../CustomSpin';

interface ButtonRoundedProps {
  className: string;
  text: string;
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  isLoading?: boolean;
}

const ButtonRounded = ({
  className,
  text,
  type,
  onClick,
  isLoading,
}: ButtonRoundedProps) => {
  return (
    <button className={`${className}`} type={type} onClick={onClick}>
      {text} {isLoading ? <CustomSpin /> : null}
    </button>
  );
};

export default ButtonRounded;
