import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface compProps {
  spinColor?: string;
}

const CustomSpin: React.FC<compProps> = ({ spinColor = '#fff' }) => (
  <Spin
    indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
    className={`text-[${spinColor}]`}
  />
);

export default CustomSpin;
