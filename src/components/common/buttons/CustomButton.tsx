import React from 'react';
import CustomSpin from '../CustomSpin';

interface compProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  text: string;
  svg?: any;
  className: string;
  disabled?: boolean;
  loading?: boolean;
  handleClick?: () => void;
}

const CustomButton = ({
  type,
  text,
  svg,
  className,
  loading,
  disabled,
  handleClick,
}: compProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={className}
      onClick={handleClick}
    >
      {svg} {text} {loading ? <CustomSpin /> : null}
    </button>
  );
};

export default CustomButton;
