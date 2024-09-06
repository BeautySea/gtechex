import React from 'react';

const AITailorResume = () => {
  return (
    <div className="py-[16px] px-[20px] rounded-[8px] mb-[20px] bg-refer-earn bg-cover bg-no-repeat bg-center object-fill w-full max-w-[617px] h-auto max-h-[8.875rem] bg-gradient-to-r from-[#190534] to-[#332447] flex flex-col items-start justify-center gap-[12px]">
      <div className="flex items-start flex-col justify-center gap-[4px]">
        <h3 className="text-[#F8F9FF] text-base font-semibold">
          Tailor Resume to Job
        </h3>
        <p className="text-[#DBDBDC] text-xs font-medium">
          Tailor your resume to a Job Description and <br />
          <span className="text-[#F6D155]">
            skyrocket your chance of getting hired
          </span>
        </p>
      </div>
      {/* <button
      className="flex items-center justify-center gap-[4px] bg-[#F6D155] py-[8px] px-[12px] rounded text-xs text-[#131D26] font-medium"
      style={{
        boxShadow: '0px 4px 8px 2px #F6D15540',
      }}
    >
      <BlackSpakle /> Score Resume
    </button> */}
    </div>
  );
};

export default AITailorResume;
