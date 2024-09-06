import React from 'react';
import BorderWrapper from '../../common/BorderWrapper';

interface compProps {
  // toggleSidePage?: boolean;
  analysisData: any;
}

const AtsGeneralResult = ({ analysisData }: compProps) => {
  function arrayToCommaSeparatedString(stringArray: string[]): string {
    return stringArray.join(', ');
  }
  return (
    <div className="flex flex-col bg-[#fff] ">
      <div className="py-5 px-3 flex flex-col gap-[8px]">
        <BorderWrapper bg="#fff">
          <div className="flex flex-col gap-[16px] text-pretty">
            <h3 className="text-sm text-[#131D26] font-semibold">
              ATS Keywords
            </h3>
            <p className="text-xs text-[#219653] font-medium inline-block w-[90%]">
              {/* Cloud Architecture, Solution Design, Cloud Computing, Networking,
              Virtualization, Agile Methodology, Project Management, Cloud
              Architecture, Solution Design, Cloud Computing, Networking,
              Virtualization, Agile Methodology, Project Management, Cloud
              Architecture, Solution Design, Cloud Computing, Networking,
              Virtualization, Agile Methodology, Project Management, */}
              {arrayToCommaSeparatedString(analysisData?.ats_keywords_to_add)}
            </p>
          </div>
        </BorderWrapper>
        <BorderWrapper bg="#fff">
          <div className="flex flex-col gap-[16px]">
            <h3 className="text-sm text-[#131D26] font-semibold">
              General Keywords
            </h3>
            <p className="text-xs text-[#219653] font-medium inline-block w-[90%]">
              {/* Cloud Architecture, Solution Design, Cloud Computing, Networking,
              Virtualization, Agile Methodology, Project Management */}
              {arrayToCommaSeparatedString(
                analysisData?.general_keywords_to_add
              )}
            </p>
          </div>
        </BorderWrapper>
      </div>
    </div>
  );
};

export default AtsGeneralResult;
