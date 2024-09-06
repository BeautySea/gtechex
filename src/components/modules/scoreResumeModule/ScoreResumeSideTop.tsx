import React from 'react';
import ProgressBarComp from '../../common/ProgressBarComp';
interface compProps {
  resumeScore: string | number;
}

const ScoreResumeSideTop = ({ resumeScore }: compProps) => {
  return (
    <div className="flex flex-col my-2 gap-[4px] w-full">
      <h2 className="text-xl text-[#131D26] font-semibold">
        Overall Score:<span className="text-[#219653]">{resumeScore}/100</span>
      </h2>
      <p className="text-xs text-[#414343] font-medium">
        Your score is being calculated by expert insights from recruiters
      </p>
      <ProgressBarComp width={`${resumeScore}%`} bg="#219653" />
    </div>
  );
};

export default ScoreResumeSideTop;
