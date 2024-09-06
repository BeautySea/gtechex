import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { CollapseArrow, ExpandArrow } from '../../common/Icons';
import TabPageWRapper from './TabPageWRapper';
// experience_responsibilities
interface IFormInput {
  experiences: {
    company_name: string;
    position: string;
    experience_responsibilities: { responsibility: string }[];
    start_year: string;
    end_year: string;
    currentWork: boolean;
  }[];
}
interface compProps {
  setFormData: any;
  setSwitchTab: any;
  formData: any;
}
// responsibility
const WorkExperienceFormComponent: React.FC<compProps> = ({
  setFormData,
  setSwitchTab,
  formData,
}) => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      experiences: [
        {
          company_name: '',
          position: '',
          experience_responsibilities: [{ responsibility: '' }],
          start_year: '',
          end_year: '',
          currentWork: false,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiences',
  });

  const [expandedSections, setExpandedSections] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const onSubmit = (data: IFormInput) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      experience: data,
    }));
  };

  return (
    <>
      <TabPageWRapper
        title="Work Experience"
        description="Here, you will include all of your work experience"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="flex flex-col gap-3">
            {fields.map((field, index) => {
              const currentWorkField = watch(
                `experiences.${index}.currentWork`
              );
              const isExpanded = expandedSections[index];
              return (
                <div
                  key={field.id}
                  className="w-full flex flex-col gap-[12px] lg:w-[674px] mb-4 border border-[#E5E6EC]  rounded-t"
                >
                  <div className="flex items-center justify-between py-[12px] px-[20px] bg-[#A8A8AB1F]">
                    <h3 className="text-sm font-medium text-[#131D26]">
                      Work Experience {index + 1}
                    </h3>
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        type="button"
                        className="text-[#EB5757] text-sm font-medium"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        className="p-2"
                        onClick={() => toggleSection(index)}
                      >
                        {isExpanded ? <CollapseArrow /> : <ExpandArrow />}
                      </button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="p-[20px]">
                      <div className="flex  gap-3">
                        <div className="flex-grow">
                          <label className="block mb-1 text-xs font-semibold text-[#131D26]">
                            Company Name{' '}
                            <span className="text-sm text-[#EB5757] font-semibold">
                              *
                            </span>
                          </label>
                          <input
                            {...register(`experiences.${index}.company_name`, {
                              required: true,
                            })}
                            className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                              errors.experiences &&
                              errors.experiences[index]?.company_name
                                ? 'border-red-500'
                                : ''
                            }`}
                            placeholder="Company Name"
                          />
                          {errors.experiences &&
                            errors.experiences[index]?.company_name && (
                              <span className="text-red-500">
                                This field is required
                              </span>
                            )}
                        </div>
                        <div className="flex-grow">
                          <label className="block mb-1 text-xs font-semibold text-[#131D26]">
                            Position{' '}
                            <span className="text-sm text-[#EB5757] font-semibold">
                              *
                            </span>
                          </label>
                          <input
                            {...register(`experiences.${index}.position`, {
                              required: true,
                            })}
                            className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                              errors.experiences &&
                              errors.experiences[index]?.position
                                ? 'border-red-500'
                                : ''
                            }`}
                            placeholder="Position"
                          />
                          {errors.experiences &&
                            errors.experiences[index]?.position && (
                              <span className="text-red-500">
                                This field is required
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 my-3">
                        <label className="block mb-0  text-xs font-semibold text-[#131D26]">
                          Your Responsibilities
                        </label>
                        <Controller
                          control={control}
                          name={`experiences.${index}.experience_responsibilities`}
                          render={({ field: { onChange, value } }) => (
                            <div>
                              {value.map((responsibility, rIndex) => (
                                <div
                                  key={rIndex}
                                  className="flex items-center gap-3 mb-2"
                                >
                                  <input
                                    value={responsibility.responsibility}
                                    onChange={(e) => {
                                      const newValue = [...value];
                                      newValue[rIndex].responsibility =
                                        e.target.value;
                                      onChange(newValue);
                                    }}
                                    className="w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded"
                                    placeholder=""
                                  />
                                  <button
                                    type="button"
                                    className="text-red-500"
                                    onClick={() => {
                                      const newValue = value.filter(
                                        (_, i) => i !== rIndex
                                      );
                                      onChange(newValue);
                                    }}
                                  >
                                    X
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                className="text-blue-500"
                                onClick={() =>
                                  onChange([...value, { responsibility: '' }])
                                }
                              >
                                + Add more
                              </button>
                            </div>
                          )}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-center items-center gap-3">
                          <div className="flex-grow">
                            <label className="block mb-1 text-xs font-semibold text-[#131D26]">
                              Start Date{' '}
                              <span className="text-sm text-[#EB5757] font-semibold">
                                *
                              </span>
                            </label>
                            <input
                              {...register(`experiences.${index}.start_year`, {
                                required: true,
                              })}
                              type="date"
                              className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                                errors.experiences &&
                                errors.experiences[index]?.start_year
                                  ? 'border-red-500'
                                  : ''
                              }`}
                            />
                            {errors.experiences &&
                              errors.experiences[index]?.start_year && (
                                <span className="text-red-500">
                                  This field is required
                                </span>
                              )}
                          </div>
                          <hr className="mt-4 border-t-4 border-[#131D26] w-4 mx-auto" />
                          <div className="flex-grow">
                            <label className="block mb-1 text-xs font-semibold text-[#131D26]">
                              End Date{' '}
                              <span className="text-sm text-[#EB5757] font-semibold">
                                *
                              </span>
                            </label>
                            <input
                              {...register(`experiences.${index}.end_year`, {
                                required: !currentWorkField,
                              })}
                              type="date"
                              disabled={currentWorkField}
                              className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                                errors.experiences &&
                                errors.experiences[index]?.end_year
                                  ? 'border-red-500'
                                  : ''
                              }`}
                            />
                            {errors.experiences &&
                              errors.experiences[index]?.end_year && (
                                <span className="text-red-500">
                                  This field is required unless you currently
                                  work here
                                </span>
                              )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            {...register(`experiences.${index}.currentWork`)}
                          />
                          <label className="text-xs font-semibold text-[#131D26]">
                            I currently work here
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className="mt-4 bg-[#fff] py-[8px] px-[12px] rounded border border-[#0077B5] flex items-center justify-center gap-[4px] text-[#0077B5] text-xs font-medium"
            onClick={() =>
              append({
                company_name: '',
                position: '',
                experience_responsibilities: [{ responsibility: '' }],
                start_year: '',
                end_year: '',
                currentWork: false,
              })
            }
          >
            + Add work experience
          </button>
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

export default WorkExperienceFormComponent;
