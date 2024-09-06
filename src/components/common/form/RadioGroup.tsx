import React, { useEffect, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

interface compProps {
  setRemoteJob?: React.Dispatch<React.SetStateAction<any>>;
}

const RadioGroup: React.FC<compProps> = ({ setRemoteJob }) => {
  const [value, setValue] = useState('remote');

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (setRemoteJob) {
      setRemoteJob(value);
    }
  }, [setRemoteJob, value]);

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value="remote">Remote</Radio>
      <Radio value="onsite">Onsite</Radio>
      <Radio value="hybrid">Hybrid</Radio>
    </Radio.Group>
  );
};

export default RadioGroup;
