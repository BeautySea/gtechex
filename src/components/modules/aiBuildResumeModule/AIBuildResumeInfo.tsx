import React from 'react';

const TailorResumeInfo = () => {
  // Replace with your actual base

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col border border-[#0077B5] p-[20px] bg-[#0077B51F] gap-[12px] rounded h-auto lg:h-auto">
        <div className="flex flex-col gap-[12px] max-w-[421px]">
          <h2 className="text-xl text-[#131D26] font-semibold">
            We just made your hiring process <br /> so much simpler and easier
          </h2>

          <p className="text-xs text-[#414343] font-medium">
            Using QuickApply’s{' '}
            <b className="font-semibold text-[#131D26]">“Tailor Resume”</b>{' '}
            feature, we have simplified the process of getting hired. This
            feature allows you to match your resume with a job description,
            using Artificial IntelIntelligence.
          </p>
          <p className="text-xs text-[#414343] font-medium">
            <b className="font-semibold text-[#131D26]">NOTE</b>: Our AI will
            not change your information but improve on them.
          </p>
        </div>
        <div className="flex flex-col gap-[12px] max-w-[421px]">
          <h3 className="text-sm text-[#0077B5] font-semibold">
            So go ahead and match one today!
          </h3>
        </div>
      </div>
      <div className="flex flex-col border border-[#EB5757] p-[20px] bg-[#EB57571F] gap-[12px] rounded h-auto lg:h-auto">
        <div className="flex flex-col gap-[12px] max-w-[421px]">
          <h3 className="text-sm text-[#EB5757] font-semibold">
            <b className="font-semibold text-[#EB5757]">NOTE</b>: Kindly make
            sure to select the correct resume and input the correct Job
            Description, so as not to be given random information by the AI.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TailorResumeInfo;
