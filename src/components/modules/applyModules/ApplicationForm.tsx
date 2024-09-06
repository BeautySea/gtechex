import { useEffect, useState } from 'react';
import TagsInput from './NewTagsInput';
import RadioGroup from '../../common/form/RadioGroup';
import CustomLabel from '../../common/Label';
import CustomDropdown from '../../common/form/CustomDropDown';
import useAxiosFucntion from '../../../api/hooks/useAxiosFucntion';
import axios from '../../../api/baseAxios';
import ENUM from '../../../service/enum';
import Spinner from '../../common/spinner/Spinner';
import toast, { Toaster } from 'react-hot-toast';

interface compProps {
  applyTypeState?: string;
}

const ApplicationForm = ({ applyTypeState }: compProps) => {
  const [skills, setSkills] = useState([]);
  const [jobStatus, setJobStatus] = useState('');
  const [selectedResume, setSelectedResume] = useState();
  const [formState, setFormState] = useState({
    country: '',
    city: '',
    jobTitle: '',
    countryToApply: '',
  });

  const token = localStorage.getItem('authToken') || '';
  // const userDetails: UserDetails | undefined = getCookie('userDetails');
  const [response, errorMsg, requestLoading, axiosRequestFucntion] =
    useAxiosFucntion();
  // console.log(skills);
  const data: string[] = ['option 1', 'option 2', 'option 3'];

  const updateFormState = (e: any) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  function setPayload() {
    const payload = {
      link: selectedResume,
      platform: applyTypeState,
      position: formState.jobTitle,
      status: jobStatus,
    };
    return payload;
  }

  const handleSubmitData = (e: any) => {
    e.preventDefault();
    const payload = setPayload();

    axiosRequestFucntion({
      axiosInstance: axios,
      method: 'POST',
      url: ENUM.SUBMIT_JOB_APPLICATIN_DETS,
      requestConfig: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      },
    });
  };

  useEffect(() => {
    if (response?.status === 201) {
      toast.success(response?.data?.message);
    }
  }, [response]);

  console.log('selectedResume', response);
  // console.log('jobStatus', jobStatus);

  return (
    <>
      {requestLoading ? (
        <Spinner />
      ) : (
        <form
          className="max-w-2xl mx-auto md:w-[586px]"
          onSubmit={handleSubmitData}
        >
          <div className="mb-2">
            <CustomLabel
              htmlFor="resume"
              required={true}
              text="Choose resume"
              className="block mb-2 text-sm font-medium text-gray-900"
            />
            <CustomDropdown
              items={data}
              setSelectedResume={setSelectedResume}
            />
          </div>
          <div className="flex items-center justify-between gap-[26px]">
            <div className="mb-5 w-1/2">
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter your Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formState.country}
                onChange={updateFormState}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Countries"
                required
              />
            </div>
            <div className="mb-5 w-1/2">
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter your city/town
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formState.city}
                onChange={updateFormState}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="City"
                required
              />
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="jobTitle"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Enter Job title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formState.jobTitle}
              onChange={updateFormState}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Job title"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="jobSkills"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Enter Job Skills
            </label>
            <TagsInput
              setData={setSkills}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5"
              placeholder="Enter job skills and click enter"
            />
          </div>
          <div className="flex items-center justify-between gap-[26px]">
            <div className="mb-5 w-1/2">
              <label
                htmlFor="countryToApply"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter your Country
              </label>
              <input
                type="text"
                id="countryToApply"
                name="countryToApply"
                value={formState.countryToApply}
                onChange={updateFormState}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Countries"
              />
            </div>

            <div className=" w-full">
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Remote Jobs only
              </label>
              <div className="flex items-start mb-2">
                <RadioGroup setRemoteJob={setJobStatus} />
              </div>
            </div>
          </div>

          {selectedResume === undefined ? (
            <button
              type="button"
              disabled
              className="w-full text-[#F6D251] text-base bg-[#131D26] focus:ring-4 focus:outline-none font-medium rounded-3xl  w-full px-5 py-2.5 text-center cursor-not-allowed"
            >
              Apply now
            </button>
          ) : (
            <button
              type="submit"
              className="w-full text-[#F6D251] text-base bg-[#131D26] focus:ring-4 focus:outline-none font-medium rounded-3xl  w-full px-5 py-2.5 text-center"
            >
              Apply now
            </button>
          )}
        </form>
      )}
      <Toaster />
    </>
  );
};

export default ApplicationForm;
