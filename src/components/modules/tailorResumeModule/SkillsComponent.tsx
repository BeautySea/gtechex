import React, { useEffect } from 'react';
import CollapsibleWrapper from './CollapsibleWrapper';
import BorderWrapper from '../../common/BorderWrapper';
import { Skills } from '../../pages/tailoreResume/TailoredResumePage';

interface compProps {
  skillsData: Skills[];
  handleInputChange: (section: string, e: any, id: number) => void;
  addSkill: () => void;
  removeSkill: (id: number) => void;
}

const SkillsComponent: React.FC<compProps> = ({
  skillsData,
  handleInputChange,
  addSkill,
  removeSkill,
}) => {
  const handleSkillChange = (id: number, e: any) => {
    console.log('e', e.target.value);

    handleInputChange('skills', e, id);
  };

  return (
    <CollapsibleWrapper title="Skills">
      {skillsData.map((skill, index) => (
        <div key={index} className="mt-4 flex items-center">
          <div className="flex-1 w-full">
            <BorderWrapper bg="#fff">
              <label className="block text-xs font-semibold text-[#131D26]">
                Skill Title
              </label>
              <input
                type="text"
                name="name"
                value={skill.name}
                onChange={(e) => handleSkillChange(index, e)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </BorderWrapper>
          </div>

          {skillsData.length > 1 && (
            <button
              onClick={() => removeSkill(index)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addSkill}
        className="mt-4 flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Skill
      </button>
    </CollapsibleWrapper>
  );
};

export default SkillsComponent;
