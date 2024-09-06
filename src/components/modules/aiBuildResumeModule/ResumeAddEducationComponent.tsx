import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { CollapseArrow, ExpandArrow } from '../../common/Icons';
import TabPageWRapper from './TabPageWRapper';
import CustomSpin from '../../common/CustomSpin';

interface Education {
  //   schoolName: string;
  //   certification: string;
  //   courseOfStudy: string;
  //   startDate: string;
  //   endDate: string;
  school_name: string;
  certification: string;
  course_study: string;
  start_year: string;
  end_year: string;
}

export interface IFormInputEducation {
  education: Education[];
}
interface compProps {
  setFormData: any;
  setSwitchTab: any;
  formData: any;
  isLoading: boolean;
}

const ResumeAddEducationComponent: React.FC<compProps> = ({
  setFormData,
  setSwitchTab,
  formData,
  isLoading,
}) => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IFormInputEducation>({
    defaultValues: {
      education: [
        {
          school_name: '',
          certification: '',
          course_study: '',
          start_year: '',
          end_year: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  const [expandedSections, setExpandedSections] = useState<{
    [key: number]: boolean;
  }>({ 0: true });

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const onSubmit = (data: IFormInputEducation) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      education: data,
    }));
  };

  return (
    <>
      <TabPageWRapper
        title="Education"
        description="Here, you will enter the details for your highest level of education. You can also include any trainings that you have undergone relating to the job you want"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="flex flex-col gap-3">
            {fields.map((field, index) => {
              const isExpanded = expandedSections[index];
              return (
                <div
                  key={field.id}
                  className="w-full flex flex-col gap-[12px] lg:w-[674px] mb-4 border border-[#E5E6EC]  rounded-t"
                >
                  <div className="flex items-center justify-between py-[12px] px-[20px] bg-[#A8A8AB1F]">
                    <h3 className="text-sm font-medium text-[#131D26]">
                      School {index + 1}
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
                      <div className="flex gap-3 my-4">
                        <div className="flex-grow">
                          <label className="block mb-1 text-xs font-semibold text-[#131D26]">
                            Name of School{' '}
                            <span className="text-sm text-[#EB5757] font-semibold">
                              *
                            </span>
                          </label>
                          <input
                            {...register(`education.${index}.school_name`, {
                              required: true,
                            })}
                            className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                              errors.education &&
                              errors.education[index]?.school_name
                                ? 'border-red-500'
                                : ''
                            }`}
                            placeholder="Name of School"
                          />
                          {errors.education &&
                            errors.education[index]?.school_name && (
                              <span className="text-red-500">
                                This field is required
                              </span>
                            )}
                        </div>
                        <div className="flex-grow">
                          <label className="block mb-1 text-xs font-semibold text-[#131D26]">
                            Certification{' '}
                            <span className="text-sm text-[#EB5757] font-semibold">
                              *
                            </span>
                          </label>
                          <input
                            {...register(`education.${index}.certification`, {
                              required: true,
                            })}
                            className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                              errors.education &&
                              errors.education[index]?.certification
                                ? 'border-red-500'
                                : ''
                            }`}
                            placeholder="Certification"
                          />
                          {errors.education &&
                            errors.education[index]?.certification && (
                              <span className="text-red-500">
                                This field is required
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="w-1/2 my-4">
                        <label className="block mb-1 text-xs font-semibold text-[#131D26]">
                          Course of Study{' '}
                          <span className="text-sm text-[#EB5757] font-semibold">
                            *
                          </span>
                        </label>
                        <input
                          {...register(`education.${index}.course_study`, {
                            required: true,
                          })}
                          className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                            errors.education &&
                            errors.education[index]?.course_study
                              ? 'border-red-500'
                              : ''
                          }`}
                          placeholder="Course of Study"
                        />
                        {errors.education &&
                          errors.education[index]?.course_study && (
                            <span className="text-red-500">
                              This field is required
                            </span>
                          )}
                      </div>
                      <div className="flex flex-col gap-3 my-4">
                        <div className="flex justify-center items-center gap-3">
                          <div className="flex-grow">
                            <label className="block mb-1 text-xs font-semibold text-[#131D26]">
                              Start Date{' '}
                              <span className="text-sm text-[#EB5757] font-semibold">
                                *
                              </span>
                            </label>
                            <input
                              {...register(`education.${index}.start_year`, {
                                required: true,
                              })}
                              type="date"
                              className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                                errors.education &&
                                errors.education[index]?.start_year
                                  ? 'border-red-500'
                                  : ''
                              }`}
                            />
                            {errors.education &&
                              errors.education[index]?.start_year && (
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
                              {...register(`education.${index}.end_year`, {
                                required: true,
                              })}
                              type="date"
                              className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                                errors.education &&
                                errors.education[index]?.end_year
                                  ? 'border-red-500'
                                  : ''
                              }`}
                            />
                            {errors.education &&
                              errors.education[index]?.end_year && (
                                <span className="text-red-500">
                                  This field is required
                                </span>
                              )}
                          </div>
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
            onClick={() => {
              append({
                school_name: '',
                certification: '',
                course_study: '',
                start_year: '',
                end_year: '',
              });
              setExpandedSections((prev) => ({
                ...prev,
                [fields.length]: true,
              }));
            }}
          >
            + Add School
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
          {isLoading ? (
            <>
              Save & Continue
              <CustomSpin />
            </>
          ) : (
            ' Save & Continue'
          )}
        </button>
      </div>
    </>
  );
};

export default ResumeAddEducationComponent;
