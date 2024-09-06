import React from 'react';
import { RedNegative } from '../../common/Icons';
interface compProps {
  text: string;
}

const ScoreDetailsItemNegative = ({ text }: compProps) => {
  return (
    <div className="flex items-start justify-start gap-[4px] w-full ">
      <div className="w-4 h-4">
        <RedNegative />
      </div>

      <span className="text-xs text-[#414343] font-medium inline-block">
        {text}
      </span>
    </div>
  );
};

export default ScoreDetailsItemNegative;
