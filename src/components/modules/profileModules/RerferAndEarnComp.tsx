import React from 'react';

const RerferAndEarnComp = () => {
  return (
    // bg-[linear-gradient(to_right_bottom,rgba(49,84,44,0.8),rgba(16,71,52,0.8)),url('../src/images/icon-bg.jpg')]
    <div className="py-[16px] px-[20px] rounded-[8px] mb-[20px] bg-refer-earn bg-cover bg-no-repeat bg-center object-fill w-full h-auto max-h-[8.875rem] bg-gradient-to-r from-[#190534] to-[#332447] flex flex-col items-start justify-center gap-[12px]">
      <div className="flex items-start flex-col justify-center gap-[4px]">
        <h3 className="text-[#F8F9FF] text-base font-semibold">Refer & Earn</h3>
        <p className="text-[#DBDBDC] text-xs font-medium">
          Earn <span className="text-[#F6D155]">$10</span> for every user that
          you invite and subscribes to any of our plans
        </p>
      </div>
      <button className="flex items-center justify-center bg-[#F6D155] py-[8px] px-[12px] rounded text-xs text-[#131D26] font-medium">
        Refer Someone
      </button>
    </div>
  );
};

export default RerferAndEarnComp;
