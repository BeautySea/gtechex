import React, { useState } from 'react';
import TopContainer from '../../modules/aiBuildResumeModule/TopContainer';
import AiResumeListTable from '../../modules/aiBuildResumeModule/AiResumeListTable';

const BuildResume = ({ handleNextUIToRender }: any) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [reset, setReset] = useState(0);
  return (
    <>
      <div className="flex items-center justify-center border border-[#E5E6EC] p-[20px] bg-[#FFFFFF] w-full h-auto md:h-[311px]">
        <div className="w-full flex flex-col items-center justify-center gap-[12px]">
          <p className="text-[#414343] text-xs font-medium">
            Build your professional resume with our AI
          </p>
          <button
            className="flex items-center justify-center bg-[#131D26] text-[#F6D155] py-[8px] px-[12px] rounded"
            onClick={() => handleNextUIToRender('select template')}
          >
            Build a Resume
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <TopContainer />
        <AiResumeListTable searchKeyword={searchKeyword} setReset={setReset} />
      </div>
    </>
  );
};

export default BuildResume;
