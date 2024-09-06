/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react';
import CustomLabel from '../../common/Label';
import Collapse from '../../common/form/Collapse';
import BorderWrapper from '../../common/BorderWrapper';
import { useNavigate } from 'react-router';
import CustomDropdown from '../../common/form/CustomDropDown';
import RadioGroup from '../../common/form/RadioGroup';
import ENUM from '../../../service/enum';
import { myAxiosWithAuthFetchWithPayload } from '../../../api/normalRequest';
import { showToastErrorMessage, showToastMessage } from '../../common/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomSpin from '../../common/CustomSpin';
import CheckboxGroup from '../../common/form/CheckBoxGroup';
import SingleCheckBox from '../../common/form/SingleCheckBox';
import GroupCheckBoxOrdinary from '../../common/form/GroupCheckBoxOrdinary';
import {
  getDiceUrl,
  getIndeedUrl,
  getLinkedInUrl,
} from '../../pages/overview/utils';

interface payloadData {
  platform?: 'indeed' | 'dice' | 'linkedin';
  title?: string;
  limit?: number;
  resume?: string;
  remote?: boolean;
}

interface formData {
  jobTitle?: string;
  jobLocation?: string;
  noOfJobs?: number | string;
  timeLine?: string;
  annualSalary?: number | string;
  experienceLevel?: string;
  jobType?: string;
}

interface compProps {
  type: 'dice' | 'Indeed' | 'linkedin';
  userId: string;
  userSubPlan?: any;
  handleManageSub?: () => void;
}

interface ScrapedJob {
  id: string;
  title: string;
  url: string;
}

type Command =
  | 'DICE_INITIALIZE_SCAN_F_B'
  | 'DICE_INITIALIZE_SCAN_B_C'
  | 'DICE_INITIALIZE_APPLICATION_F_B'
  | 'DICE_CLICK_APPLY_BUTTON_B_C'
  | 'DICE_APPLY_FOR_SINGLE_JOB_B_C'
  | 'INDEED_INITIALIZE_SCAN_F_B'
  | 'INDEED_INITIALIZE_SCAN_B_C'
  | 'INDEED_INITIALIZE_APPLICATION_F_B'
  | 'INDEED_CLICK_APPLY_BUTTON_B_C'
  | 'INDEED_APPLY_FOR_SINGLE_JOB_B_C'
  | 'LINKEDIN_INITIALIZE_SCAN_F_B'
  | 'LINKEDIN_INITIALIZE_SCAN_B_C'
  | 'LINKEDIN_INITIALIZE_APPLICATION_F_B'
  | 'LINKEDIN_APPLY_FOR_SINGLE_JOB_B_C'
  | 'PING_FULL_RENDER_B_C'
  | 'GET_PATH_NAME_B_C';

export interface IRequest {
  command: Command;
  data?: any;
}

export interface IResponse {
  data: any;
  message: string;
  status: 'success' | 'error';
}

const OverviewApplicationForm = ({
  type,
  userId,
  userSubPlan,
  handleManageSub,
}: compProps) => {
  const [resumeToScore, setResumeToScore] = useState<any>();
  const [selectedResume, setSelectedResume] = useState();
  const [inputError, setInputError] = useState('');
  const token = localStorage.getItem('authToken') || '';
  const [remoteJob, setRemoteJob] = useState<string[]>([]);
  const [seletecResumeId, setSelectedResumeId] = useState('');
  const [googleApiResponse, setGoogleApiResponse] = useState<any>(null);
  const [electedResumeName, setSelectedResumeName] = useState('');
  const [noEasyApply, setNoEasyApply] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [fetchedFormData, setFetchedFormData] = useState<payloadData>();
  const [scrapedJobs, setScrapedJobs] = useState<ScrapedJob[]>([]);
  const platform = useRef<'dice' | 'Indeed' | 'linkedin'>('Indeed');
  // const [finalMessage, setFinalMessage] = useState('');
  const [formState, setFormState] = useState<formData>({
    jobTitle: '',
    jobLocation: '',
    noOfJobs: '',
    timeLine: '',
    annualSalary: '',
    experienceLevel: '',
    jobType: '',
  });
  const navigate = useNavigate();

  const data: string[] = [
    'Select a resume',
    'option 1',
    'option 2',
    'option 3',
  ];

  const timeLine: string[] = [
    'Select Timeline',
    'Last 10 minutes',
    'Last 1 hour',
    'Last 10 days',
  ];
  const jobLocation: string[] = [
    'Select an option',
    'United States',
    'United Kingdom',
    'Canada',
    'Nigeria',
  ];
  const experienceLevel: string[] = [
    'select an option',
    'Senior',
    'Intermediate',
    'Junior',
    'Entry level',
    'Intern',
  ];

  const jobTypeData: string[] = [
    'Select an option',
    'Full Time',
    'Contract',
    'Part Time',
  ];

  console.log('type', type);

  const handleFetchApplicationData = async () => {
    try {
      const method = 'GET';
      if (type !== null) {
        const route = `${ENUM.JOB_APPLICATION_PROFILE_GET}${type}`;
        const resp = await myAxiosWithAuthFetchWithPayload({
          method,
          route,
          token,
        });

        // console.log('fetched data', resp);
        if (resp?.status === true) {
          if (resp?.data) {
            setFetchedFormData(resp?.data);
          }
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    handleFetchApplicationData();
  }, [type]);

  const handleChange = (e: any) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [e.target.name]: e.target.value,
    }));
  };

  const setPayload = () => {
    const payload = {
      platform: type ? type : 'linkedin',
      title: formState?.jobTitle,
      noOfApplications: formState?.noOfJobs ? +formState?.noOfJobs : 0,
      resume: selectedResume,
      workStatus: remoteJob[0] || 'Remote',
      expectedSalary: formState?.annualSalary,
      timePosted: formState.timeLine,
      location: formState.jobLocation,
      experienceLevel: formState.experienceLevel,
      type: formState.jobType,
      noEasyApply: noEasyApply,
    };
    return payload;
  };

  useEffect(() => {
    if (formState?.noOfJobs) {
      if (+formState.noOfJobs > 20) {
        setInputError('Value not be more than 20');
      } else {
        setInputError('');
      }
    }
  }, [formState]);

  console.log('formState', formState);

  const fetchGoogleJobs = (): any => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow' as RequestRedirect,
    };

    const userJobLocation = formState.jobLocation || '';
    const jobRole = formState?.jobTitle?.toLowerCase() || '';
    const location =
      userJobLocation.toLowerCase() === 'united states'
        ? 'usa'
        : userJobLocation.toLowerCase() === 'united kingdom'
        ? 'uk'
        : 'ca';
    const queryParams = new URLSearchParams({
      order: 'DESC',
      limit: '100',
      role: jobRole,
      location: location,
    });

    const url = `https://quick-apply-dev-cf0a1835b9f4.herokuapp.com/api/v1/users/google-search/user?${queryParams}`;

    if (jobRole !== '' && userJobLocation !== '') {
      fetch(`${url}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            console.log('this is the google api response', result);
            setGoogleApiResponse(result);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    fetchGoogleJobs();
  }, [formState]);

  // &from=searchOnDesktopSerp

  const handleScrape = useCallback(
    (_platform: 'dice' | 'Indeed' | 'linkedin') => {
      console.log('_platform', _platform);

      setScrapedJobs([]);

      chrome.runtime.sendMessage<IRequest, IResponse>(
        ENUM.CHROME_ACCESS_TOKEN,
        {
          command:
            _platform === 'dice'
              ? 'DICE_INITIALIZE_SCAN_F_B'
              : _platform === 'Indeed'
              ? 'INDEED_INITIALIZE_SCAN_F_B'
              : 'LINKEDIN_INITIALIZE_SCAN_F_B',
          data: {
            amount: Number(formState?.noOfJobs),
            url:
              _platform === 'dice'
                ? getDiceUrl({ q: formState?.jobTitle })
                : _platform === 'Indeed'
                ? getIndeedUrl({
                    q: formState?.jobTitle,
                    l: formState.jobLocation,
                    from: 'searchOnDesktopSerp',
                  })
                : getLinkedInUrl({
                    keywords: formState?.jobTitle,
                    location: formState.jobLocation,
                    f_WT: remoteJob.includes('Remote')
                      ? 2
                      : remoteJob.includes('Onsite')
                      ? 1
                      : 3,
                  }),
            userResumeID: seletecResumeId,
            userID: userId,
          },
        },
        // ['Remote', 'Onsite', 'Hybrid']

        function (response: any) {
          console.log('Response from background script:', response);
          setScrapedJobs(response.data.scrapedJobs || []);
          platform.current = _platform;
          console.log('response from job scrap', response);

          if (
            response?.status === 'success' &&
            response?.message === 'Successfully scanned for jobs'
          ) {
            console.log('googleApiResponse', googleApiResponse);

            showToastMessage(response?.message);
            // if (googleApiResponse !== null) {
            navigate('/jobs-found', {
              state: {
                data: response.data.scrapedJobs,
                platform,
                numOfJobs: formState?.noOfJobs,
                jobTitle: formState?.jobTitle,
                seletecResumeId: seletecResumeId,
                userID: userId,
                userLocation: formState.jobLocation,
                isRemote: remoteJob.includes('Remote'),
                googleApiResponse: googleApiResponse,
              },
            });
            // }
          }
        }
      );
    },
    [formState?.noOfJobs, location, formState?.jobTitle]
  );
  // navigate('/apply', { state: { data: type } });
  const handleApply = async (e: any) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const method = 'PUT';
      const data = setPayload();
      const route = ENUM.JOB_APPLICATION_PROFILE_UPDATE;
      const resp = await myAxiosWithAuthFetchWithPayload({
        method,
        route,
        token,
        data,
      });
      if (resp?.status === true) {
        showToastMessage(resp?.message);
        setIsloading(false);
        handleScrape(type);
        setTimeout(() => {
          // navigate('/jobs-found');
        }, 2000);
      }
    } catch (error) {
      console.log('error', error);
      setIsloading(false);
      if (error) {
        showToastErrorMessage('Something went wrong!');
      }
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      {/*max-w-2xl mx-auto xl:w-[714px]  */}
      <form
        className="w-full max-w-2xl xl:w-[714px] mx-auto"
        onSubmit={handleApply}
      >
        <div className="flex items-center justify-start mb-2">
          <span className="text-[#EB5757] text-xs font-normal">
            * Required fields
          </span>
        </div>
        <div className="mb-2">
          <CustomLabel
            htmlFor="resume"
            required={true}
            text="Choose resume"
            className="block mb-2 text-sm font-medium text-gray-900 "
          />
          <CustomDropdown
            items={data}
            resumeID={setSelectedResumeId}
            setSelectedResume={setSelectedResume}
            setSelectedResumeName={setSelectedResumeName}
            setResumeToScore={setResumeToScore}
          />
        </div>
        <div className="flex items-center justify-between gap-[26px]">
          <div className="mb-2 w-1/2">
            <CustomLabel
              htmlFor="jobTitle"
              required={true}
              text="Enter Job Title"
              className="block mb-2 text-sm font-medium text-gray-900"
            />
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formState.jobTitle}
              onChange={handleChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
              placeholder="e.g Frontend Engineer"
              required
            />
          </div>
          <div className="mb-2 w-1/2">
            <CustomLabel
              htmlFor="jobLocation"
              required={false}
              text="Enter Job Location"
              className="block mb-2 text-sm font-medium text-gray-900"
            />
            {/* <input
              type="text"
              id="jobLocation"
              name="jobLocation"
              value={formState.jobLocation}
              onChange={handleChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
              placeholder="e.g United States"
            /> */}
            <select
              name="jobLocation"
              id="jobLocation"
              value={formState.jobLocation}
              onChange={handleChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
            >
              {jobLocation ? (
                jobLocation?.map((item, i) => (
                  <option value={item} key={i}>
                    {item}
                  </option>
                ))
              ) : (
                <option>Select an option</option>
              )}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between gap-[26px]">
          <div className="mb-2 w-1/2">
            <CustomLabel
              htmlFor="noOfJobs"
              required={true}
              text="Enter Number of job(s) to apply"
              className="block mb-2 text-sm font-medium text-gray-900 "
            />
            <input
              type="text"
              id="noOfJobs"
              name="noOfJobs"
              value={formState.noOfJobs}
              onChange={handleChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
              placeholder="Maximum of 20 jobs per try"
              required
            />
            {inputError ? (
              <span className="text-xs font-normal text-[#EB5757]">
                {inputError}
              </span>
            ) : null}
          </div>
          <div className="mb-2 w-1/2">
            <CustomLabel
              htmlFor="timeLine"
              required={false}
              text="Time Posted"
              className="block mb-2 text-sm font-medium text-gray-900 "
            />
            <select
              name="timeLine"
              value={formState.timeLine}
              onChange={handleChange}
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
            >
              {timeLine ? (
                timeLine?.map((item, i) => (
                  <option value={item} key={i}>
                    {item}
                  </option>
                ))
              ) : (
                <option>Select an option</option>
              )}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between gap-[26px]">
          <div className=" w-1/2">
            <CustomLabel
              htmlFor="workStatus"
              required={true}
              text="Work Status"
              className="block mb-2 text-sm font-medium text-gray-900 "
            />
            <div className="flex items-start mb-2">
              {/* <RadioGroup setRemoteJob={setRemoteJob} /> */}
              {/* <CheckboxGroup setRemoteJob={setRemoteJob} /> */}
              <GroupCheckBoxOrdinary setRemoteJob={setRemoteJob} />
            </div>
          </div>
        </div>
        {type === 'dice' ? null : (
          <div className="mb-2">
            <CustomLabel
              htmlFor="annualSalary"
              required={false}
              text="What is your expected annual salary?"
              className="block mb-2 text-sm font-medium text-gray-900 "
            />
            <input
              type="text"
              id="annualSalary"
              name="annualSalary"
              value={formState.annualSalary}
              onChange={handleChange}
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 px-4 py-2"
              placeholder="in USD"
            />
          </div>
        )}

        {/* <div className=""> */}
        <Collapse title="Click for Additional Search Filters">
          <BorderWrapper>
            <div className="flex items-center justify-between gap-[26px]">
              {type === 'dice' ? null : (
                <div className="mb-2 w-1/2">
                  <CustomLabel
                    htmlFor="experienceLevel"
                    required={false}
                    text="Experience Level"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  />
                  <select
                    name="experienceLevel"
                    value={formState.experienceLevel}
                    onChange={handleChange}
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                  >
                    {experienceLevel ? (
                      experienceLevel?.map((item, i) => (
                        <option value={item} key={i}>
                          {item}
                        </option>
                      ))
                    ) : (
                      <option>Select an option</option>
                    )}
                  </select>
                </div>
              )}

              <div className="mb-2 w-1/2">
                <CustomLabel
                  htmlFor="jobType"
                  required={false}
                  text="Job Type"
                  className="block mb-2 text-sm font-medium text-gray-900"
                />
                <select
                  name="jobType"
                  value={formState.jobType}
                  onChange={handleChange}
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2 "
                >
                  {jobTypeData ? (
                    jobTypeData?.map((item, i) => (
                      <option value={item} key={i}>
                        {item}
                      </option>
                    ))
                  ) : (
                    <option>Select an option</option>
                  )}
                </select>
              </div>
            </div>
            {type === 'linkedin' || type === 'dice' ? (
              <div className="w-full flex items-center justify-start">
                <SingleCheckBox
                  label="No-EasyApply"
                  selectedItem={setNoEasyApply}
                />
              </div>
            ) : null}
          </BorderWrapper>
        </Collapse>
        {/* </div> */}
        {/* {inputError ? (
          <button
            disabled
            type="submit"
            className="w-auto text-[#F6D251] text-base focus:ring-4 focus:outline-none font-medium rounded-[4px] px-4 py-2 text-center cursor-not-allowed"
            style={{ backgroundColor: 'rgba(19, 29, 38, 0.6)' }}
          >
            Apply now
          </button>
        ) : userSubPlan === null ? (
          <button
            type="button"
            onClick={handleManageSub}
            className="w-auto text-[#F6D251] text-base bg-[#131D26] flex items-center gap-[2px] focus:ring-4 focus:outline-none font-medium rounded-[4px] px-4 py-2 text-center"
          >
            Apply now
          </button>
        ) : (
          <button
            type="submit"
            className="w-auto text-[#F6D251] text-base bg-[#131D26] flex items-center gap-[2px] focus:ring-4 focus:outline-none font-medium rounded-[4px] px-4 py-2 text-center"
          >
            Apply now {isLoading ? <CustomSpin /> : null}
          </button>
        )} */}
        <button
          type="submit"
          className="w-auto text-[#F6D251] text-base bg-[#131D26] flex items-center gap-[2px] focus:ring-4 focus:outline-none font-medium rounded-[4px] px-4 py-2 text-center"
        >
          Fetch Jobs {isLoading ? <CustomSpin /> : null}
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default OverviewApplicationForm;
