import React, { useState } from 'react';
import { useNavigate } from 'react-router';

interface compProps {
  setPageToRender?: React.Dispatch<React.SetStateAction<string>>;
  pagetoRender?: string;
}

const AccountManagementTab = ({ setPageToRender, pagetoRender }: compProps) => {
  const navigate = useNavigate();
  const handleTabClick = (page: string) => {
    // setPageToRender(page);
    navigate(`/account?tab=${page}`);
  };
  return (
    <div className="inline-flex border border-[#E5E6EC] rounded-[4px] list-none mt-[10px] mb-[10px] bg-[#ffffffcc]">
      <li
        onClick={() => handleTabClick('Profile')}
        className={`w-auto py-[8px] px-[14px] cursor-pointer  text-sm font-medium border-r border-[#E5E6EC] ${
          pagetoRender === 'Profile'
            ? 'bg-[#414143] text-[#fff] rounded-l'
            : 'text-[#131D26]'
        }`}
      >
        Profile
      </li>
      <li
        onClick={() => handleTabClick('Manage Subscription')}
        className={`w-auto py-[8px] px-[14px] cursor-pointer text-[#131D26] text-sm font-medium border-r border-[#E5E6EC] ${
          pagetoRender === 'Manage Subscription'
            ? 'bg-[#414143] text-[#fff] '
            : 'text-[#131D26]'
        }`}
      >
        Manage Subscription
      </li>
      {/* <li
        onClick={() => handleTabClick('Transaction History')}
        className={`w-auto py-[8px] px-[14px] cursor-pointer text-[#131D26] text-sm font-medium ${
          pagetoRender === 'Transaction History'
            ? 'bg-[#414143] text-[#fff] rounded-r'
            : 'text-[#131D26]'
        }`}
      >
        Transaction History
      </li> */}
    </div>
  );
};

export default AccountManagementTab;
