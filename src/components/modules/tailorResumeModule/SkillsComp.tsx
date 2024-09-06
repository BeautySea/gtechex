import React from 'react';

const SkillsComp = () => {
  return (
    <div className="flex flex-col gap-[16px] border border-[#E5E6EC] rounded">
      <div className="p-[20px] flex flex-col gap-[16px]">
        <div className="flex items-center justify-between w-[70%]">
          <div className="flex flex-col gap-[4px]">
            <h3 className="text-[#131D26] text-[12px] font-bold">
              Scripting Experience (Linux)
            </h3>
            <div className="flex items-center gap-[4px] fot-semibold">
              <span className="text-[12px] text-[#131D26] ">Advanced</span>
              <span className="text-[12px] text-[#131D26] ">
                Proficiency Level: 5
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsComp;
