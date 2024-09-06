import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { AddSkills, DeleteX } from '../../common/Icons';
import TabPageWRapper from './TabPageWRapper';

interface IFormInput {
  certifications: {
    name: string;
    organization: string;
    url: string;
    issued_date: string;
    expiry_date?: string;
  }[];
}

interface compProps {
  setFormData: any;
  setSwitchTab: any;
  formData: any;
}

const ResumeAddCErtificationFormComponent: React.FC<compProps> = ({
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
      certifications: [
        {
          name: '',
          organization: '',
          url: '',
          issued_date: '',
          expiry_date: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certifications',
  });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      certification: data,
    }));
  };

  return (
    <>
      <TabPageWRapper
        title="Certification"
        description="Every certification that you have attained that is related to your career goal should be written here"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="flex flex-col gap-3">
            {fields.map((field, index) => (
              <div className="w-full flex gap-[12px] lg:w-[674px]">
                <div
                  key={field.id}
                  className="flex flex-col gap-3 mb-4 w-[90%] border border-[#E5E6EC] p-[20px] rounded"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-grow">
                      <label className="block mb-1 text-xs font-semibold text-[#131D26]">
                        {index === 0
                          ? 'Certificate Title/Name (Optional)'
                          : 'Certificate Title/Name'}
                      </label>
                      <input
                        {...register(`certifications.${index}.name`, {
                          required: index === 0,
                        })}
                        className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                          errors.certifications &&
                          errors.certifications[index]?.name
                            ? 'border-red-500'
                            : ''
                        }`}
                        placeholder="Title"
                      />
                      {errors.certifications &&
                        errors.certifications[index]?.name && (
                          <span className="text-red-500">
                            This field is required
                          </span>
                        )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex-grow">
                      <label className="block mb-1 text-xs font-semibold text-[#131D26]">
                        Organization
                      </label>
                      <input
                        {...register(`certifications.${index}.organization`, {
                          required: index === 0,
                        })}
                        className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                          errors.certifications &&
                          errors.certifications[index]?.organization
                            ? 'border-red-500'
                            : ''
                        }`}
                        placeholder="Organization"
                      />
                      {errors.certifications &&
                        errors.certifications[index]?.organization && (
                          <span className="text-red-500">
                            This field is required
                          </span>
                        )}
                    </div>

                    <div className="w-full flex gap-[12px]">
                      <div className="flex-grow w-1/2">
                        <label className="block mb-1 text-xs font-semibold text-[#131D26]">
                          Issued Date (optional)
                        </label>
                        <input
                          {...register(`certifications.${index}.issued_date`, {
                            required: index === 0,
                          })}
                          type="date"
                          className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                            errors.certifications &&
                            errors.certifications[index]?.issued_date
                              ? 'border-red-500'
                              : ''
                          }`}
                        />
                        {errors.certifications &&
                          errors.certifications[index]?.issued_date && (
                            <span className="text-red-500">
                              This field is required
                            </span>
                          )}
                      </div>

                      <div className="flex-grow w-1/2">
                        <label className="block mb-1 text-xs font-semibold text-[#131D26]">
                          Expiry Date (optional)
                        </label>
                        <input
                          {...register(`certifications.${index}.expiry_date`)}
                          type="date"
                          className="w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded"
                        />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <label className="block mb-1 text-xs font-semibold text-[#131D26]">
                        Certificate Link (Optional)
                      </label>
                      <input
                        {...register(`certifications.${index}.url`, {
                          required: index === 0,
                        })}
                        className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                          errors.certifications &&
                          errors.certifications[index]?.url
                            ? 'border-red-500'
                            : ''
                        }`}
                        placeholder="Link"
                      />
                      {errors.certifications &&
                        errors.certifications[index]?.url && (
                          <span className="text-red-500">
                            This field is required
                          </span>
                        )}
                    </div>
                  </div>
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
              append({
                name: '',
                organization: '',
                url: '',
                issued_date: '',
                expiry_date: '',
              })
            }
          >
            <AddSkills /> Add Certification
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

export default ResumeAddCErtificationFormComponent;
