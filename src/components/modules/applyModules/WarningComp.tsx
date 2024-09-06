import React from 'react';

interface compProps {
  applyTypeState: string;
}
const WarningComp = ({ applyTypeState }: compProps) => {
  return (
    <div className="w-full max-w-[754px] mx-auto flex items-center justify-start bg-[#EB57571F] rounded-[4px] mb-[12px] px-[12px] py-[8px]">
      <p className="text-sm text-[#EB5757] font-semibold">
        NOTE: You must be logged in to your <b>{applyTypeState}</b> account in
        order to apply to <b>{applyTypeState}</b> jobs
      </p>
    </div>
  );
};

export default WarningComp;
