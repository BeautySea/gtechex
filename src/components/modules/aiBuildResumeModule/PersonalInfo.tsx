import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import CustomLabel from '../../common/Label';
import TabPageWRapper from './TabPageWRapper';

interface IFormInput {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender?: string;
  country: string;
  state: string;
  jobTitle: string;
  GitHubURL: string;
  PortfolioWebsite: string;
  LinkedInURL: string;
  DribbbleURL: string;
}
interface compProps {
  setFormData: any;
  setSwitchTab: any;
  formData: any;
}

const BuildResumePersonalInfo: React.FC<compProps> = ({
  setFormData,
  setSwitchTab,
  formData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    console.log('personal inof', data);

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      personalInfo: data,
    }));
  };

  return (
    <>
      <TabPageWRapper
        title="Personal Information"
        description="  Please fill out the information below to enable employers
                  reach you"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 border border-[#E5E6EC] bg-[#fff] rounded"
        >
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <CustomLabel
                htmlFor="FullName"
                required={true}
                text="Full Name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              />
              <input
                {...register('fullName', { required: true })}
                className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                  errors.fullName ? 'border-red-500' : ''
                }`}
                placeholder="Full Name"
              />
              {errors.fullName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <CustomLabel
                htmlFor="EmailAddress"
                required={true}
                text="Email Address"
                className="block mb-2 text-sm font-medium text-gray-900 "
              />
              <input
                {...register('email', { required: true })}
                type="email"
                className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                  errors.email ? 'border-red-500' : ''
                }`}
                placeholder="Email Address"
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <CustomLabel
                htmlFor="PhoneNumber"
                required={true}
                text="Phone Number"
                className="block mb-2 text-sm font-medium text-gray-900 "
              />
              <input
                {...register('phoneNumber', { required: true })}
                type="tel"
                className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                  errors.phoneNumber ? 'border-red-500' : ''
                }`}
                placeholder="Phone Number"
              />
              {errors.phoneNumber && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <CustomLabel
                htmlFor="Gender"
                required={false}
                text="Gender"
                className="block mb-2 text-sm font-medium text-gray-900 "
              />
              <select
                {...register('gender')}
                className="w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <CustomLabel
                htmlFor="Country"
                required={true}
                text="Country"
                className="block mb-2 text-sm font-medium text-gray-900 "
              />
              <select
                {...register('country', { required: true })}
                className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                  errors.country ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select Country</option>
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
                <option value="uk">UK</option>
                {/* Add more options as needed */}
              </select>
              {errors.country && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <CustomLabel
                htmlFor="State"
                required={true}
                text="State"
                className="block mb-2 text-sm font-medium text-gray-900 "
              />
              <select
                {...register('state', { required: true })}
                className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                  errors.state ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select State</option>
                <option value="new-york">New York</option>
                <option value="california">California</option>
                <option value="texas">Texas</option>
                {/* Add more options as needed */}
              </select>
              {errors.state && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <CustomLabel
                htmlFor="Job Title"
                required={true}
                text="Job Title"
                className="block mb-2 text-sm font-medium text-gray-900 "
              />
              <input
                {...register('jobTitle', { required: true })}
                className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded ${
                  errors.jobTitle ? 'border-red-500' : ''
                }`}
                placeholder="Job Title"
              />
              {errors.jobTitle && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-wrap">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <CustomLabel
                  htmlFor="PortfolioWebsite"
                  required={false}
                  text="Portfolio Website"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                />
                <input
                  {...register('PortfolioWebsite', { required: false })}
                  type="text"
                  className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded`}
                  placeholder="Portfolio Website"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <CustomLabel
                  htmlFor="GitHubURL"
                  required={false}
                  text="GitHub URL"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                />
                <input
                  {...register('GitHubURL', { required: false })}
                  type="text"
                  className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded`}
                  placeholder="GitHub URL"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <CustomLabel
                  htmlFor="LinkedInURL"
                  required={false}
                  text="LinkedIn URL"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                />
                <input
                  {...register('LinkedInURL', { required: false })}
                  type="text"
                  className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded`}
                  placeholder="LinkedIn URL"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <CustomLabel
                  htmlFor="DribbbleURL"
                  required={false}
                  text="Dribbble URL"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                />
                <input
                  {...register('DribbbleURL', { required: false })}
                  type="text"
                  className={`w-full py-[8px] px-[12px] border border-[#E5E6EC] rounded`}
                  placeholder="Dribbble URL"
                />
              </div>
            </div>
          </div>

          {/* <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button> */}
        </form>
      </TabPageWRapper>

      <div className="flex items-center justify-start gap-3">
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

export default BuildResumePersonalInfo;
