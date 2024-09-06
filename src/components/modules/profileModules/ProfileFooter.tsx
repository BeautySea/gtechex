import React from 'react';

const ProfileFooter = () => {
  return (
    <div className="flex flex-col w-full bg-[#FFFFFF] h-auto mt-[20px]">
      <div className="flex items-center justify-start py-[16px] px-[40px] border-t border-[#E5E6EC]">
        <h3 className="inline-block max-w-[341px] text-sm font-medium text-[#414343]">
          Please reach out to{' '}
          <a
            href="mailto: billing@quickapply.ai"
            className="text-[#131D26] font-semibold italic"
          >
            ”billing@quickapply.ai”
          </a>{' '}
          for any concern about billing
        </h3>
      </div>
      <div className="flex items-center justify-start py-[16px] px-[40px] border-t border-[#E5E6EC]">
        <ul className="flex items-center gap-[20px]">
          <li className="text-xs text-[#414343] cursor-pointer font-medium">
            Terms & Conditions
          </li>
          <li className="text-xs text-[#414343] cursor-pointer font-medium">
            Privacy Policy
          </li>
          <li className="text-xs text-[#414343] cursor-pointer font-medium">
            Refund Policy
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileFooter;
