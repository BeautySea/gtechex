import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import PasswordChecklist from 'react-password-checklist';
import CustomLabel from '../../common/Label';
import BorderWrapper from '../../common/BorderWrapper';
import InputWithAvatar from '../../common/form/InputWithAvatar';

interface compProps {
  setValidPassword: React.Dispatch<React.SetStateAction<boolean>>;
  passwordData: {
    password: string;
    confirmPassword: string;
  };
  setPasswordData: React.Dispatch<
    React.SetStateAction<{
      password: string;
      confirmPassword: string;
    }>
  >;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
  errMsg: string;
}

const ChangePassword = ({
  setValidPassword,
  setPasswordData,
  passwordData,
  setErrMsg,
  errMsg,
}: compProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  useEffect(() => {
    // setValidPassword(true);
    if (passwordData.password !== '' && passwordData.confirmPassword !== '') {
      if (passwordData.password === passwordData.confirmPassword) {
        // setValidPassword(true);
        setErrMsg('Old password and new password can not be the same');
      } else {
        // setValidPassword(false);
        setErrMsg('');
      }
    }
  }, [passwordData, setErrMsg, setValidPassword]);
  // console.log('passwordData', passwordData);
  console.log('validPassword');

  return (
    <>
      <form className="w-full">
        {/* {errMsg ? (
          <small className="text-xs text-[#EB5757] font-medium mb-2">
            {errMsg}
          </small>
        ) : null} */}
        <BorderWrapper>
          <div className="flex items-center gap-[20px]">
            <div className="mb-5 w-[50%]">
              <CustomLabel
                htmlFor="password"
                text="New Password"
                className="text-[#131D26] text-xs font-medium"
                required={true}
              />
              <InputWithAvatar
                name="password"
                changeHadler={handleInputChange}
                placeholder="Enter new password"
                required={true}
                value={passwordData.password}
                type="password"
                avatar={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M7.99 1.33325C10.0358 1.33325 11.682 2.94311 11.682 4.93059V5.95282C12.8302 6.31122 13.6668 7.35068 13.6668 8.59219V11.8835C13.6668 13.4204 12.3926 14.6666 10.8216 14.6666H5.17936C3.60773 14.6666 2.3335 13.4204 2.3335 11.8835V8.59219C2.3335 7.35068 3.17079 6.31122 4.31835 5.95282V4.93059C4.32513 2.94311 5.97127 1.33325 7.99 1.33325ZM7.99678 8.92277C7.67161 8.92277 7.40742 9.18114 7.40742 9.49914V10.9699C7.40742 11.2945 7.67161 11.5529 7.99678 11.5529C8.32871 11.5529 8.59291 11.2945 8.59291 10.9699V9.49914C8.59291 9.18114 8.32871 8.92277 7.99678 8.92277ZM8.00355 2.49261C6.62838 2.49261 5.51062 3.5791 5.50385 4.91734V5.80905H10.4965V4.93059C10.4965 3.58573 9.37872 2.49261 8.00355 2.49261Z"
                      fill="#C1C1C3"
                    />
                  </svg>
                }
              />
            </div>
            <div className="mb-5 w-[50%]">
              <CustomLabel
                htmlFor="confirmPassword"
                text="Confirm Password"
                className="text-[#131D26] text-xs font-medium"
                required={true}
              />
              <InputWithAvatar
                name="confirmPassword"
                placeholder="Confirm password"
                required={true}
                type="password"
                changeHadler={handleInputChange}
                value={passwordData.confirmPassword}
                avatar={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M7.99 1.33325C10.0358 1.33325 11.682 2.94311 11.682 4.93059V5.95282C12.8302 6.31122 13.6668 7.35068 13.6668 8.59219V11.8835C13.6668 13.4204 12.3926 14.6666 10.8216 14.6666H5.17936C3.60773 14.6666 2.3335 13.4204 2.3335 11.8835V8.59219C2.3335 7.35068 3.17079 6.31122 4.31835 5.95282V4.93059C4.32513 2.94311 5.97127 1.33325 7.99 1.33325ZM7.99678 8.92277C7.67161 8.92277 7.40742 9.18114 7.40742 9.49914V10.9699C7.40742 11.2945 7.67161 11.5529 7.99678 11.5529C8.32871 11.5529 8.59291 11.2945 8.59291 10.9699V9.49914C8.59291 9.18114 8.32871 8.92277 7.99678 8.92277ZM8.00355 2.49261C6.62838 2.49261 5.51062 3.5791 5.50385 4.91734V5.80905H10.4965V4.93059C10.4965 3.58573 9.37872 2.49261 8.00355 2.49261Z"
                      fill="#C1C1C3"
                    />
                  </svg>
                }
              />
            </div>
          </div>
          <div>
            <PasswordChecklist
              rules={[
                'minLength',
                'specialChar',
                'number',
                'capital',
                'lowercase',
                'match',
              ]}
              minLength={8}
              value={passwordData.password}
              valueAgain={passwordData.confirmPassword}
              onChange={(isValid) => {
                if (isValid === true) {
                  setValidPassword(true);
                }
              }}
              messages={{
                minLength: 'Must be more that 8 characters in length.',
                capital: 'Must contain at least one UPPERCASE character.',
                lowercase: 'Must contain at least one LOWERCASE character.',
                specialChar: 'Must contain SPECIAL Characters.',
                number: 'Must have at least one NUMBER',
                match: 'Password must match',
              }}
              style={{ color: '#414343' }}
            />
          </div>
        </BorderWrapper>
      </form>
    </>
  );
};

export default ChangePassword;
