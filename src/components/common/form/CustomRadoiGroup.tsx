// import React from 'react';

// const CustomRadoiGroup = () => {
//   return (
//     <div>

//     </div>
//   );
// }

// export default CustomRadoiGroup;
import React, { useEffect, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

interface compProps {
  setRemoteJob?: React.Dispatch<React.SetStateAction<any>>;
  options: string[];
}

const CustomRadoiGroup: React.FC<compProps> = ({ setRemoteJob, options }) => {
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
      {options
        ? options.map((item) => <Radio value={item}>{item}</Radio>)
        : null}
      {/* // <Radio value="remote">Remote</Radio>
      // <Radio value="onsite">Onsite</Radio>
      // <Radio value="hybrid">Hybrid</Radio> */}
    </Radio.Group>
  );
};

export default CustomRadoiGroup;
