import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

interface compProps {
  selectedItem?: any;
  label: string;
}

const SingleCheckBox: React.FC<compProps> = ({ selectedItem, label }) => {
  const onChange: CheckboxProps['onChange'] = (e) => {
    selectedItem(e.target.checked);
  };

  return <Checkbox onChange={onChange}>{label}</Checkbox>;
};

export default SingleCheckBox;
