import React, { useState, useEffect } from 'react';
import CollapsibleWrapper from './CollapsibleWrapper';

interface compProps {
  objectives: string;
  setResumeObjectives: React.Dispatch<React.SetStateAction<string>>;
  resumeObjevtives: string;
  handleInputChange: any;
}

const Objectives: React.FC<compProps> = ({
  objectives,
  resumeObjevtives,
  setResumeObjectives,
  handleInputChange,
}) => {
  // const handleChange = (e: any) => {
  //   setResumeObjectives(e.target.value);
  // };

  return (
    <CollapsibleWrapper title="Objectives">
      <textarea
        name="objectives"
        id="objectives"
        value={objectives}
        // onChange={handleChange}
        onChange={(e) => handleInputChange('objective', e)}
        cols={30}
        rows={5}
        className="mt-1 block w-full py-[8px] px-[12px] text-[#131D26] placeholder:text-[#131D26] border-none rounded focus:ring-[#fff] focus:border-none sm:text-xs"
      ></textarea>
    </CollapsibleWrapper>
  );
};

export default Objectives;
