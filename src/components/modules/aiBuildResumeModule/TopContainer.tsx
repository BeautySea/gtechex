import React from 'react';
import SearchComponent from '../../layouts/topNav/SearchComponent';

interface compProps {
  searchKeyWord?: string;
  setSearchKeyWord?: React.Dispatch<React.SetStateAction<string>>;
  resumeListData?: any;
  userSubPlan?: any;
  handleTogleResumeLimit?: () => void;
  handleFreePlanResumeLimit?: () => void;
}

const TopContainer = ({ searchKeyWord, setSearchKeyWord }: compProps) => {
  return (
    <div className="w-full flex flex-col gap-[12px]">
      <h4 className="text-base text-[#131D26] font-semibold leading-6">
        Previously Built Resumes
      </h4>
      <div className="flex items-center justify-between">
        <SearchComponent placeHolder="Search resume" />
      </div>
    </div>
  );
};

export default TopContainer;
