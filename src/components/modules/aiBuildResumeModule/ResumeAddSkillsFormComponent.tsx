import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { AddSkills, DeleteX } from '../../common/Icons';
import TabPageWRapper from './TabPageWRapper';

interface IFormInput {
  skills: { name: string; skill_level: any; year_of_experience: any }[];
}

interface compProps {
  setFormData: any;
  setSwitchTab: any;
  formData: any;
}

const ResumeAddSkillsFormComponent: React.FC<compProps> = ({
  setFormData,
  setSwitchTab,
  formData,
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      skills: [{ name: '', skill_level: '0', year_of_experience: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const onSubmit = (data: IFormInput) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      skills: data,
    }));
  };
  console.log(' register', fields);

  //   <CustomLabel
  //   htmlFor="FullName"
  //   required={true}
  //   text="Full Name"
  //   className="block mb-2 text-sm font-medium text-gray-900 "
  // />

  return (
    <>
      <TabPageWRapper
        title="Skills"
        description="Every skill that you have learnt which is related to what you do, should be written here"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="flex flex-col gap-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-3">
                <div className="flex-grow border border-[#E5E6EC] p-[20px] lg:w-[674px] rounded">
                  <label className="block mb-1 text-xs text-[#131D26] font-semibold">
                    {index === 0 ? 'Skills Title' : 'Skill Title'}
                  </label>
                  <input
                    {...register(`skills.${index}.name`, {
                      required: index === 0,
                    })}
                    className={`w-full  h-8 py-[8px] px-[12px] border border-[#131D26] rounded ${
                      errors.skills && errors.skills[index]
                        ? 'border-red-500'
                        : ''
                    }`}
                  />
                  <input
                    {...register(`skills.${index}.skill_level`, {
                      required: index === 0,
                    })}
                    className={`hidden ${
                      errors.skills && errors.skills[index]
                        ? 'border-red-500'
                        : ''
                    }`}
                  />
                  <input
                    {...register(`skills.${index}.year_of_experience`, {
                      required: index === 0,
                    })}
                    className={`hidden ${
                      errors.skills && errors.skills[index]
                        ? 'border-red-500'
                        : ''
                    }`}
                  />
                  {errors.skills && errors.skills[index] && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    className="bg-0 text-white p-2 rounded border-0"
                    onClick={() => remove(index)}
                  >
                    <DeleteX />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 bg-[#fff]  py-[8px] px-[12px] rounded border border-[#0077B5] flex items-center justify-center gap-[4px] text-[#0077B5] text-xs font-medium"
            onClick={() =>
              append({ name: '', skill_level: '0', year_of_experience: 0 })
            }
          >
            <AddSkills />
            Add Skill
          </button>
          {/* <button
        type="submit"
        className="mt-4 bg-green-500 text-white p-2 rounded"
      >
        Submit
      </button> */}
        </form>
      </TabPageWRapper>
      <div className="flex items-center justify-start gap-3">
        <button
          className="flex items-center justify-center bg-[#A8A8AB33] text-[#131D26] py-[8px] px-[12px] rounded"
          // onClick={() => handleNextUIToRender('build')}
        >
          Go Back
        </button>
        <button
          className="flex items-center justify-center bg-[#131D26] text-[#F6D155] py-[8px] px-[12px] rounded"
          onClick={handleSubmit(onSubmit)}
        >
          Save & Continue
        </button>
      </div>
    </>
  );
};

export default ResumeAddSkillsFormComponent;
