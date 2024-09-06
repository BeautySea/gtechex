import React, { useState } from 'react';

interface compProps {
  togledPlan: string;
  setToggledPlan: React.Dispatch<React.SetStateAction<string>>;
}

const OtherPlansTab = ({ togledPlan, setToggledPlan }: compProps) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    setToggledPlan(e.target.innerText);
  };
  return (
    <div className="bg-[#FFFFFF] border border-[#C1C1C3] p-[4px] rounded flex items-center gap-[4px]">
      <button
        type="button"
        onClick={(e: any) => handleClick(e)}
        className={`flex items-center justify-center py-[4px] px-[20px] rounded text-xs ${
          togledPlan === 'Monthly'
            ? 'text-[#F6D155] bg-[#131D26]'
            : 'text-[#414343]'
        } font-semibold`}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={(e: any) => handleClick(e)}
        className={`flex items-center justify-center py-[4px] px-[20px] rounded text-xs ${
          togledPlan === 'Yearly'
            ? 'text-[#F6D155] bg-[#131D26]'
            : 'text-[#414343]'
        } font-semibold`}
      >
        Yearly
      </button>
    </div>
  );
};

export default OtherPlansTab;
