import React, { useEffect } from 'react';
import CollapsibleWrapper from './CollapsibleWrapper';

interface Responsibility {
  responsibility: string;
}

interface WorkExperience {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  currentlyWorking: boolean;
  rewritten_responsibility: Responsibility[];
  responsibility: any;
}

interface compProps {
  workExperienceData: WorkExperience[];
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleInputChange: (
    section: string,
    e: React.ChangeEvent<HTMLInputElement>,
    id: any,
    responsibilityIndex?: any
  ) => void;
}

const WorkExperienceForm: React.FC<compProps> = ({
  workExperienceData,
  formData,
  setFormData,
  handleInputChange,
}) => {
  useEffect(() => {
    setFormData({
      ...formData,
      work_experience: workExperienceData,
    });
  }, [workExperienceData]);

  const handleAddExperience = () => {
    const newExperience = {
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      currentlyWorking: false,
      rewritten_responsibility: [{ responsibility: '' }],
    };
    setFormData({
      ...formData,
      work_experience: [...formData.work_experience, newExperience],
    });
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = formData.work_experience.filter(
      (_: any, i: number) => i !== index
    );
    setFormData({
      ...formData,
      work_experience: updatedExperience,
    });
  };

  const handleAddResponsibility = (expIndex: number) => {
    const updatedExperiences = formData.work_experience.map(
      (exp: WorkExperience, i: number) =>
        i === expIndex
          ? {
              ...exp,
              rewritten_responsibility: [
                ...exp.rewritten_responsibility,
                { responsibility: '' },
              ],
            }
          : exp
    );
    setFormData({
      ...formData,
      work_experience: updatedExperiences,
    });
  };

  const handleResponsibilityChange = (
    expIndex: number,
    respIndex: number,
    value: string
  ) => {
    const updatedExperiences = formData.work_experience.map(
      (exp: WorkExperience, i: number) =>
        i === expIndex
          ? {
              ...exp,
              rewritten_responsibility: exp.rewritten_responsibility.map(
                (resp, j) =>
                  j === respIndex ? { responsibility: value } : resp
              ),
            }
          : exp
    );
    setFormData({
      ...formData,
      work_experience: updatedExperiences,
    });
  };

  const handleRemoveResponsibility = (expIndex: number, respIndex: number) => {
    const updatedExperiences = formData.work_experience.map(
      (exp: WorkExperience, i: number) =>
        i === expIndex
          ? {
              ...exp,
              rewritten_responsibility: exp.rewritten_responsibility.filter(
                (_: any, j: number) => j !== respIndex
              ),
            }
          : exp
    );
    setFormData({
      ...formData,
      work_experience: updatedExperiences,
    });
  };

  console.log('workExperienceData', workExperienceData);

  return (
    <CollapsibleWrapper title="Work Experience">
      <div className="container mx-auto p-4">
        {workExperienceData?.length > 0 &&
          workExperienceData?.map((exp: WorkExperience, index: number) => (
            <div key={index} className="mb-4 border border-gray-300 rounded-lg">
              <div className="flex justify-between items-center bg-[#A8A8AB1F] p-4">
                <h2 className="text-lg font-semibold text-[#131D26]">
                  Work Experience {index + 1}
                </h2>
                <button
                  onClick={() => handleRemoveExperience(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2 text-[#131D26] text-sm font-semibold">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={exp.company}
                      onChange={(e) =>
                        handleInputChange('work_experience', e, index)
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-[#131D26] text-sm font-semibold">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={exp.position}
                      onChange={(e) =>
                        handleInputChange('work_experience', e, index)
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-[#131D26] text-sm font-semibold flex gap-[4px] items-center justify-start">
                    Your Responsibilities{' '}
                    <div className="py-[4px] px-[8px] rounded bg-[#131D26] flex items-center justify-center">
                      <span className="text-base font-semi-bold text-[#fff]">
                        {' '}
                        AI-GENERATED
                      </span>
                    </div>
                  </label>
                  {
                    // exp?.responsibility > 0
                    //   ? exp.responsibility.map((resp: any, respIndex: number) => (
                    //       <div key={respIndex} className="flex items-center mb-2">
                    //         <textarea
                    //           name="rewritten_responsibility"
                    //           value={resp.responsibility}
                    //           onChange={(e) =>
                    //             handleResponsibilityChange(
                    //               index,
                    //               respIndex,
                    //               e.target.value
                    //             )
                    //           }
                    //           className="w-full p-2 border border-gray-300 rounded whitespace-break-spaces"
                    //         ></textarea>
                    //         <button
                    //           onClick={() =>
                    //             handleRemoveResponsibility(index, respIndex)
                    //           }
                    //           className="text-red-500 ml-2"
                    //         >
                    //           &#x2716;
                    //         </button>
                    //       </div>
                    //     ))
                    //   : exp?.responsibility
                  }
                  <button
                    onClick={() => handleAddResponsibility(index)}
                    className="flex items-center justify-center bg-[#A8A8AB33] py-[8px] px-[12px] rounded gap-[4px] text-[#131D26] text-sm font-medium"
                  >
                    + Add more
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2 text-[#131D26] text-sm font-semibold">
                      Start Date
                    </label>
                    <input
                      type="text"
                      name="start_date"
                      value={exp.start_date}
                      onChange={(e) =>
                        handleInputChange('work_experience', e, index)
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-[#131D26] text-sm font-semibold">
                      End Date
                    </label>
                    <input
                      type="text"
                      name="end_date"
                      value={exp.end_date}
                      onChange={(e) =>
                        handleInputChange('work_experience', e, index)
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-start mt-2 w-full">
                    <input
                      type="checkbox"
                      name="currentlyWorking"
                      checked={exp.end_date === 'Present'}
                      onChange={(e: any) =>
                        handleInputChange(
                          'work_experience',
                          {
                            ...e,
                            target: {
                              ...e.target,
                              value: e.target.checked,
                            },
                          },
                          index
                        )
                      }
                      className="mr-2 mb-2"
                    />
                    <label className="block mb-2 text-[#131D26] text-sm font-semibold">
                      I currently work here
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <button
          onClick={handleAddExperience}
          className="mt-4 flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100"
        >
          + Add work experience
        </button>
      </div>
    </CollapsibleWrapper>
  );
};

export default WorkExperienceForm;
