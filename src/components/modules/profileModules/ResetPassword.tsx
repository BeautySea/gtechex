import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  function handleChange(otp: string) {
    setOtp(otp);
  }
  return (
    <div className="w-full flex flex-col">
      <span className="text-xs text-[#5F5F5F] font-normal">
        A code has been sent to your email address jo********.com
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
    </div>
  );
};

export default ResetPassword;
