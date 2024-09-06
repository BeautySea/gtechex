import React from 'react';

const ReferSomeone = () => {
  return (
    <div className="py-[16px] px-[20px] rounded-[8px] mb-[20px] bg-black-refer  w-full h-auto max-h-[8.875rem] bg-gradient-to-r from-[#190534] to-[#332447] flex flex-col items-start justify-center gap-[12px]">
      <div className="flex items-start flex-col justify-center gap-[4px]">
        <h3 className="text-[#F8F9FF] text-base font-semibold">
          Refer someone to a job
        </h3>
        <p className="text-[#DBDBDC] text-xs font-medium">
          Found a job somewhere? You can refer someone to it
        </p>
      </div>
      <button
        className="flex items-center justify-center gap-[4px] bg-[#F8F9FF] py-[8px] px-[12px] rounded text-xs text-[#131D26] font-medium"
        style={{
          // boxShadow: '0px 29px 16.6px -12px rgba(0, 119, 181, 0.25)',
          //   boxShadow: '0px 29px 16.6px -12px #131D2640',
          boxShadow: '0px 4px 8px 2px #F8F9FF40',
        }}
      >
        Refer Someone
      </button>
    </div>
  );
};

export default ReferSomeone;
