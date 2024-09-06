import React from 'react';
import ScoreResumeSideTop from './ScoreResumeSideTop';
import ScoreResult from './ScoreResult';
import AtsGeneralResult from './AtsGeneralResult';
import { roundToNearestDecimal } from '../../../utils/utilFucntions';

interface compProps {
  toggleSidePage?: boolean;
  analysisData: any;
}

const ScoreResumeSidePage = ({ analysisData }: compProps) => {
  console.log('analysisData', analysisData);
  return (
    <div
      className={`flex flex-col w-full max-w-[754px]
       mt-0 h-[100%] overflow-y-auto scrollbar-hide`}
    >
      <div
        className={`flex-col border-l border-[#E5E6EC] h-auto bg-[#FFFFFF] py-5 px-3 `}
      >
        <ScoreResumeSideTop
          resumeScore={roundToNearestDecimal(analysisData?.ats_keyword_score)}
        />
        {/* <div className="flex flex-col"> */}
        <ScoreResult analysisData={analysisData} />
      </div>
      <div className="flex items-center justify-start py-2 px-5 bg-[#A8A8ABB2]">
        <span className="text-xs text-[#131D26] font-medium">
          ATS and General Keywords suggestions to add
        </span>
      </div>
      <AtsGeneralResult analysisData={analysisData} />
    </div>
  );
};

export default ScoreResumeSidePage;
