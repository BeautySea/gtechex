import React, { useState } from 'react';
import Layoutwrapper from '../../layouts/layoutwrapper';
import InnerLayoutWrapper from '../../layouts/InnerLayoutWrapper';
import TemplateOne from '../../../assets/CVTemplates(1).png';
import TemplateTwo from '../../../assets/CVTemplates(2).png';
import BorderWrapper from '../../common/BorderWrapper';

type nextUIType = 'init' | 'build' | 'select template';
interface compProps {
  setResumeDets: React.Dispatch<
    React.SetStateAction<{
      resName: string;
      resID: string;
    }>
  >;
  handleNextUIToRender: (nextUI: nextUIType) => void;
}

interface ResumeTemplateProps {
  templateId: number;
  location: string;
  resumeName: any;
  onSelect: (id: number) => void;
}

const resumeTemplateList = [
  {
    path: TemplateOne,
    id: 1,
  },
  {
    path: TemplateTwo,
    id: 2,
  },
];

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({
  templateId,
  location,
  resumeName,
  onSelect,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative w-full lg:w-[250px] h-96 border border-gray-300 rounded-lg overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={location}
        alt={`Resume Template ${templateId}`}
        className="w-full h-full"
      />
      {hover &&
        (resumeName === '' ? (
          <button
            disabled
            className="absolute inset-0 m-auto h-12 w-[90%]  bg-[#131d26b3] text-white py-[8px] px-[12px] rounded transform -translate-y-1/2 cursor-not-allowed"
            style={{ top: '10%' }}
          >
            Choose Resume
          </button>
        ) : (
          <button
            className="absolute inset-0 m-auto h-12 w-[90%]  bg-[#131D26] text-white py-[8px] px-[12px] rounded transform -translate-y-1/2 cursor-pointer"
            style={{ top: '10%' }}
            onClick={() => onSelect(templateId)}
          >
            Choose Resume
          </button>
        ))}
    </div>
  );
};

const SelectResumeTemplateComponent: React.FC<compProps> = ({
  handleNextUIToRender,
  setResumeDets,
}) => {
  const [resumeName, setResumeName] = useState('');
  const handleSelect = (id: number) => {
    setResumeDets({
      resName: resumeName,
      resID: `${id}`,
    });
    handleNextUIToRender('build');
    console.log(`Resume Template ${id} selected!`);
  };

  return (
    <Layoutwrapper>
      {/* <InnerLayoutWrapper> */}
      <div className="flex flex-col gap-[16px] w-full lg:w-[70%]  mx-auto mt-4">
        <div className="w-full bg-[#fff] border border-[#E5E6EC] p-[20px] rounded-[8px] flex flex-col items-start justify-center gap-[12px]">
          <h1 className="text-base font-semibold text-[#131D26]">
            Resume Information
          </h1>
          {/* resumeName, setResumeName */}
          <div className="p-[20px] border border-[#E5E6EC] rounded-[8px] w-full flex flex-col gap-[4px]">
            <label
              htmlFor="resumeName"
              className="text-xs text-[#131D26] font-semibold"
            >
              Enter Resume Name<span className="text-[#EB5757]">*</span>
            </label>
            <input
              type="text"
              name="resumeName"
              id="resumeName"
              value={resumeName}
              onChange={(e: any) => setResumeName(e.target.value)}
              className="border border-[#E5E6EC] py-[8px] px-[12px] rounded text-[#131D26] text-sm"
            />
          </div>
        </div>

        <div className="rounded-[8px]  w-full bg-[#FFFFFF] p-[20px] border border-[#E5E6EC]">
          <div className="flex flex-col w-full items-start justify-center">
            <h1 className="text-base font-semibold text-[#131D26]">
              Choose Resume Template<span className="text-[#EB5757]">*</span>
            </h1>
            <p className="text-sm text-[#414343] font-medium">
              You can only choose one template
            </p>
          </div>
          <div className="flex justify-start items-center mt-5 border border-[#E5E6EC] rounded-[8px] p-[20px] gap-[16px]">
            {resumeTemplateList.map((item) => (
              <ResumeTemplate
                templateId={item.id}
                location={item.path}
                onSelect={handleSelect}
                resumeName={resumeName}
                key={item.id}
              />
            ))}

            {/* <ResumeTemplate templateId={2} onSelect={handleSelect} /> */}
          </div>
        </div>
      </div>
      {/* </InnerLayoutWrapper> */}
    </Layoutwrapper>
  );
};

export default SelectResumeTemplateComponent;
