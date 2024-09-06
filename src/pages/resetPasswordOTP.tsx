import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import Layoutwrapper from '../components/layouts/layoutwrapper';
import InnerLayoutWrapper from '../components/layouts/InnerLayoutWrapper';
import { useLocation, useNavigate } from 'react-router';

const ResetPasswordOTP = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const userEmail = location.state && location.state.data;
  const navigate = useNavigate();
  function handleChange(otp: string) {
    setOtp(otp);
  }

  const handleNextPage = () => {
    if (otp !== '') {
      navigate('/change-password', { state: { data: otp } });
    }
  };

  //   change-password
  return (
    <Layoutwrapper>
      <div className="flex flex-col w-full mb-5 mx-auto">
        <div className="flex items-center justify-between gap-[13px] mb-[37px] border-b border-[#C5C5C5] h-[70px] bg-[#FFFFFF]">
          <InnerLayoutWrapper>
            <div className="flex flex-col h-full">
              <h3 className="text-sm text-[#131D26]  font-semibold">
                Account Details
              </h3>
              <span className="text-xs text-[#8D8E91]  font-medium">
                Manage your profile information here
              </span>
            </div>
          </InnerLayoutWrapper>
        </div>
        <InnerLayoutWrapper>
          <div className="w-full flex flex-col">
            <span className="text-xs text-[#5F5F5F] font-normal">
              A code has been sent to your email address {userEmail}
            </span>
            <div className="flex flex-col gap-[8px] mt-[37px] mb-[19px]">
              <span className="text-base text-[#5F5F5F] font-medium ml-2">
                Enter code
              </span>
              <OtpInput
                onChange={handleChange}
                value={otp}
                inputStyle="otpInputStyle"
                numInputs={6}
                renderSeparator={<span> </span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <div className="ml-2">
              <button
                type="button"
                onClick={handleNextPage}
                className="flex items-center justify-center text-[12px] text-[#131D26] font-medium w-[100px] bg-[#A8A8AB33] rounded-[4px] py-[8px] px-[12px] gap-[4px]"
              >
                Next
              </button>
            </div>
          </div>
        </InnerLayoutWrapper>
      </div>
    </Layoutwrapper>
  );
};

export default ResetPasswordOTP;
