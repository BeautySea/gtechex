import React, { useState } from 'react';

const ResumeBuilderSideBar = ({ setSwitchTab }: any) => {
  const [currentTab, setCurrentTab] = useState('Personal Information');

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setSwitchTab(tab);
  };

  console.log('currentTab', currentTab);

  // #131D26
  return (
    <div className="h-screen border border-[#E5E6EC] bg-[#FFFFFF] py-[20px] px-[12px] mt-0">
      <div className="p-[20px] flex flex-col gap-[12px] rounded-[8px] border border-[#E5E6EC]">
        <button
          className={`border ${
            currentTab === 'Personal Information'
              ? 'border-[#D6D6D6] bg-[#D6D6D6] text-[#131D26]'
              : 'border-[#E5E6EC] bg-[#fff] text-[#abababe6]'
          } 
         
           rounded-[5px] py-[8px] px-[12px] flex items-center justify-start  text-sm font-medium`}
          onClick={() => handleTabChange('Personal Information')}
        >
          Personal Information
        </button>
        <button
          className={`border ${
            currentTab === 'Skills'
              ? 'border-[#D6D6D6] bg-[#D6D6D6] text-[#131D26]'
              : 'border-[#E5E6EC] bg-[#fff] text-[#abababe6]'
          } 
         
           rounded-[5px] py-[8px] px-[12px] flex items-center justify-start  text-sm font-medium`}
          onClick={() => handleTabChange('Skills')}
        >
          Skills
        </button>
        <button
          className={`border ${
            currentTab === 'Certification'
              ? 'border-[#D6D6D6] bg-[#D6D6D6] text-[#131D26]'
              : 'border-[#E5E6EC] bg-[#fff] text-[#abababe6]'
          } 
         
           rounded-[5px] py-[8px] px-[12px] flex items-center justify-start  text-sm font-medium`}
          onClick={() => handleTabChange('Certification')}
        >
          Certification
        </button>
        <button
          className={`border ${
            currentTab === 'Work Experience'
              ? 'border-[#D6D6D6] bg-[#D6D6D6] text-[#131D26]'
              : 'border-[#E5E6EC] bg-[#fff] text-[#abababe6]'
          } 
         
           rounded-[5px] py-[8px] px-[12px] flex items-center justify-start  text-sm font-medium`}
          onClick={() => handleTabChange('Work Experience')}
        >
          Work Experience
        </button>
        <button
          className={`border ${
            currentTab === 'Education'
              ? 'border-[#D6D6D6] bg-[#D6D6D6] text-[#131D26]'
              : 'border-[#E5E6EC] bg-[#fff] text-[#abababe6]'
          } 
         
           rounded-[5px] py-[8px] px-[12px] flex items-center justify-start  text-sm font-medium`}
          onClick={() => handleTabChange('Education')}
        >
          Education
        </button>
      </div>
    </div>
  );
};

export default ResumeBuilderSideBar;
