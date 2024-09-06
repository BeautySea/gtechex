import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UploadResumeModal from '../../../modules/resumeModules/UploadResumeModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageSubTitle from '../../../layouts/PageSubTitle';
import Layoutwrapper from '../../../layouts/layoutwrapper';
import InnerLayoutWrapper from '../../../layouts/InnerLayoutWrapper';
import ResumePageTopContainer from '../../../modules/resumeModules/ResumePageTopContainer';
import ResumeListTable from '../../../modules/resumeModules/ResumeListTable';
import OtherFormsModal from '../../../modules/resumeModules/OtherFormsModal';
import EmptyResumeComp from '../../../modules/resumeModules/EmptyResumeComp';
import ENUM from '../../../../service/enum';
import { myAxiosWithAuthFetchWithPayload } from '../../../../api/normalRequest';
import ResumeSubmitedModal from '../../../modules/resumeModules/ResumeSubmitedModal';
import { AnyARecord } from 'dns';
import useAuth from '../../../../hooks/context/useUserDetails';
import TableLoadingComp from '../../../common/TableLoadingComp';
import ResumeLimitModal from '../createResume/ResumeLimitModal';
import useAxios from '../../../../api/hooks/useAxios';
import axios from '../../../../api/baseAxios';
import NoPlanModal from '../../../common/modal/NoPlanModal';
import FreePlanResumeUploadLimit from '../../../common/modal/FreePlanResumeUploadLimit';
import MatchResumeComp from './MatchResumeComp';

interface stateProps {}

export interface DataType {
  dataKey: React.ReactNode;
  serialNo: number;
  resumeName: string;
  resumeType?: string;
  resumeSize?: number;
}
interface Payload {
  type: string;
  file: {
    name: string;
    size: number;
    location: string;
    key: string;
  };
  profile: {
    personal_info: {
      state: string;
      country: string;
      gender: string;
      phoneNo: string;
      summary: string;
      email: string;
      fullName: string;
      portfoloWebsite: string;
      github: string;
      linkedIn: string;
      dribble: string;
    };
    miscellaneous: {
      totalWorkExperience: string | undefined;
      veteranStatus: string | undefined;
      disability: string | undefined;
      willingToRelocate: string | undefined;
      raceOrEthnicity: string | undefined;
      expectedSalaryAmount: string | undefined;
      expectedSalaryCurrency: string | undefined;
      currentSalaryAmount: string | undefined;
      drivingLicense: string | undefined;
      currentSalaryCurrency: string | undefined;
      noticePeriod: string | undefined;
      driversLicense: string | undefined;
      expectedJoiningDate: string | undefined;
      requireSponsorship: boolean | undefined;
      haveActiveSecurityClearance: string | undefined;
      countriesAuthorizedToWorkIn: string | undefined;
      coverLater: string | undefined;
    };
    work_experience: {
      company: string;
      position: string;
      tasks: string;
      isCurrent: boolean;
      startMonth: string;
      startYear: string;
      endMonth: string;
      endYear: string;
    }[];
    skills: string[];
    education: {
      nameOfSchool: string;
      certificate: string;
      courseOfStudy: string;
      startMonth: string;
      startYear: string;
      endMonth: string;
      endYear: string;
    }[];
    languages: {
      spokenLanguage: string;
      languageProficiency: string;
    }[];
    certifications: string[];
  };
}

// const data: DataType[] = [];
const data: DataType[] = [
  {
    dataKey: 1,
    serialNo: 1,
    resumeName: 'Product Designer.pdf',
    resumeType: 'pdf',
    resumeSize: 2,
  },
  {
    dataKey: 2,
    serialNo: 2,
    resumeName: 'Front Developer.txt',
    resumeType: 'txt',
    resumeSize: 2,
  },
  {
    dataKey: 3,
    serialNo: 3,
    resumeName: 'Front Engineer.doc',
    resumeType: 'doc',
    resumeSize: 2,
  },
  {
    dataKey: 4,
    serialNo: 4,
    resumeName: 'Project Manager.pdf',
    resumeType: 'pdf',
    resumeSize: 2,
  },
  {
    dataKey: 5,
    serialNo: 5,
    resumeName: 'Project Manager.doc',
    resumeType: 'doc',
    resumeSize: 2,
  },
];

export interface otherFormData {
  workExperience?: string | undefined;
  veteranStatus: string | undefined;
  disability: string | undefined;
  willingToRelocate: string | undefined;
  raceEthnicity: string | undefined;
  expectedSalary: string | undefined;
  expectedSalaryCurrency: string | undefined;
  currentSalary: string | undefined;
  currentSalaryCurrency: string | undefined;
  noticePeriod: string | undefined;
  drivingLicense: string | undefined;
  expectedDateOfJoining: string | undefined;
  countriesAuthorisedToWork: string | undefined;
  coverLetter: string | undefined;
}
const ResumesList = () => {
  const navigate = useNavigate();
  const { clearAuthData } = useAuth();
  const [sponsorshipForEmploymentVisa, setSponsorshipForEmploymentVisa] =
    useState('');
  const token = localStorage.getItem('authToken') || '';
  const [userSubPlan, errorMsg, requestLoading, refreshFucntion] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: ENUM.GET_USER_SUBSCRIPTION_PLAN,
    requestConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const [activeSecurityClearance, setActiveSecurityClearance] = useState('');

  const [otherFomrSTate, setOtherFomrSTate] = useState<otherFormData>({
    workExperience: '',
    veteranStatus: '',
    disability: '',
    willingToRelocate: '',
    raceEthnicity: '',
    expectedSalary: '',
    expectedSalaryCurrency: '',
    currentSalary: '',
    currentSalaryCurrency: '',
    noticePeriod: '',
    drivingLicense: '',
    expectedDateOfJoining: '',
    countriesAuthorisedToWork: '',
    coverLetter: '',
  });
  const [toggleOtherForms, settOggleOtherForms] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [reset, setReset] = useState(false);
  const [toggleFreePlanResumeLimit, setToggleFreePlanResumeLimit] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedResumeDets, setUploadedResumeDets] = useState<any>({});
  const [toggleNoPlan, setToggleNoPlan] = useState(false);
  const [toggleSuccessMsg, setToggleSuccessMsg] = useState(false);
  // const token = localStorage.getItem('authToken') || '';
  const [responseFromAI, setResponseFromAI] = useState<any>({});
  const [toggleresumeLimit, setTogleResumeLimit] = useState(false);
  const [resumeListData, setReSumeListData] = useState({
    count: 0,
    resumes: [],
  });

  const [searchKeyWord, setSearchKeyWord] = useState('');
  //   const [toggleOtherForms, settOggleOtherForms] = useState(false);
  const [uploadResume, setUploadResume] = useState(false);

  const location = useLocation();
  const fileToUploadData = location.state && location.state;

  //   console.log('fileToUploadData', fileToUploadData);

  const handleUploadResume = () => {
    setUploadResume(!uploadResume);
  };

  const handleToggleOtherForms = () => {
    settOggleOtherForms(!toggleOtherForms);
  };

  const handleTogleResumeLimit = () => {
    setTogleResumeLimit(!toggleresumeLimit);
  };

  const handleToggleSuccessModal = () => {
    settOggleOtherForms(false);
    setToggleSuccessMsg(!toggleSuccessMsg);
  };

  const handleTogleNoPlan = () => {
    setToggleNoPlan(!toggleNoPlan);
  };

  useEffect(() => {
    if (fileToUploadData) {
      setUploadResume(true);
    }
  }, [fileToUploadData]);

  const handleFreePlanResumeLimit = () => {
    setToggleFreePlanResumeLimit(!toggleFreePlanResumeLimit);
  };

  //   }, [token, reset]);

  useEffect(() => {
    const handleFetchResumeList = async () => {
      setIsFetching(true);
      try {
        const method = 'GET';
        const route = ENUM.GET_ALL_RESUME;
        const resp = await myAxiosWithAuthFetchWithPayload({
          method,
          route,
          token,
        });

        if (resp?.status === true) {
          setIsFetching(false);
          if (resp?.data) {
            setReSumeListData({
              count: resp?.data?.count,
              resumes: resp?.data?.resumes,
            });
          }
        }
      } catch (error: any) {
        setIsFetching(false);
        if (error?.name === 'AxiosError') {
          if (error?.response?.status === 401) {
            if (error?.response?.data?.data?.message === 'jwt expired') {
              clearAuthData();
              navigate('/login');
            }
          }
        }
      } finally {
        setIsFetching(false);
        setReset(false);
      }
    };
    handleFetchResumeList();
  }, [token, reset]);

  //   console.log('responseFromAI', responseFromAI);
  //   console.log('otherFomrSTate', otherFomrSTate);
  console.log('this is the responseFromAI', responseFromAI[2]);

  const setPayload = () => {
    const payload: Payload = {
      type: 'custom',
      file: {
        name: uploadedResumeDets?.originalname,
        size: uploadedResumeDets?.size,
        location: uploadedResumeDets?.location,
        key: uploadedResumeDets?.key,
      },
      profile: {
        personal_info: {
          state: responseFromAI[0]?.personal_information?.address || 'null',
          country: responseFromAI[0]?.personal_information?.address || 'null',
          gender: responseFromAI[0]?.personal_information?.gender || 'null',
          phoneNo: responseFromAI[0]?.personal_information?.phone || 'null',
          summary: responseFromAI[0]?.personal_information?.summary || 'null',
          email: responseFromAI[0]?.personal_information?.email || 'null',
          fullName:
            responseFromAI[0]?.personal_information?.full_name || 'null',
          portfoloWebsite:
            responseFromAI[0]?.personal_information?.personal_website || 'null',
          github: responseFromAI[0]?.personal_information?.github || 'null',
          linkedIn: responseFromAI[0]?.personal_information?.linkedin || 'null',
          dribble: responseFromAI[0]?.personal_information?.dribble || 'null',
        },
        miscellaneous: {
          totalWorkExperience: otherFomrSTate.workExperience,
          veteranStatus: otherFomrSTate.veteranStatus,
          disability: otherFomrSTate.disability,
          willingToRelocate: otherFomrSTate.willingToRelocate,
          raceOrEthnicity: otherFomrSTate.raceEthnicity,
          expectedSalaryAmount: otherFomrSTate.expectedSalary,
          expectedSalaryCurrency: otherFomrSTate.expectedSalaryCurrency,
          currentSalaryAmount: otherFomrSTate.currentSalary || 'null',
          currentSalaryCurrency: otherFomrSTate.currentSalaryCurrency || 'null',
          drivingLicense: 'null',
          noticePeriod: otherFomrSTate.noticePeriod,
          driversLicense: 'null',
          expectedJoiningDate: otherFomrSTate.expectedDateOfJoining,
          requireSponsorship:
            sponsorshipForEmploymentVisa === 'Yes' ? true : false,
          haveActiveSecurityClearance: activeSecurityClearance,
          countriesAuthorizedToWorkIn: otherFomrSTate.countriesAuthorisedToWork,
          coverLater: otherFomrSTate.coverLetter,
        },

        work_experience: responseFromAI[1]?.work_experience
          ? responseFromAI[1]?.work_experience?.map((item: any) => ({
              company: item?.company,
              position: item?.position || 'null',
              tasks: item?.responsibilities || 'null',
              isCurrent: item?.end_date === null ? true : false,
              startMonth: item?.start_date || 'null',
              startYear: item?.start_date || 'null',
              endMonth: item?.end_date ? item.end_date : 'null',
              endYear: item?.end_date ? item.end_date : 'null',
            }))
          : [
              {
                company: 'null',
                position: 'null',
                tasks: 'null',
                isCurrent: false,
                startMonth: 'null',
                startYear: 'null',
                endMonth: 'null',
                endYear: 'null',
              },
            ],

        skills: responseFromAI[2]?.skills,
        education: responseFromAI[0]?.education
          ? responseFromAI[0]?.education?.map((item: any) => ({
              nameOfSchool: item?.institution || 'null',
              certificate: item?.degree || 'null',
              courseOfStudy: item?.field_of_study || 'null',
              startMonth: item?.start_date || 'null',
              startYear: item?.start_date || 'null',
              endMonth: item?.end_date || 'null',
              endYear: item?.end_date || 'null',
            }))
          : [
              {
                nameOfSchool: 'null',
                certificate: 'null',
                courseOfStudy: 'null',
                startMonth: 'null',
                startYear: 'null',
                endMonth: 'null',
                endYear: 'null',
              },
            ],
        languages: responseFromAI?.languages
          ? responseFromAI?.languages?.map((item: any) => ({
              spokenLanguage: item?.spokenLanguage || 'null',
              languageProficiency: item?.languageProficiency || 'null',
            }))
          : [
              {
                spokenLanguage: 'none',
                languageProficiency: 'none',
              },
            ],
        certifications: responseFromAI[1]?.certifications || ['null'],
        // workExperience: responseFromAI?.work_experience ?? [],
        // skills: responseFromAI?.skills ?? [],
        // education: responseFromAI?.education ?? [],
        // languages: responseFromAI?.languages ?? [],
        // certifications: responseFromAI?.certifications ?? [],
      },
    };

    return payload;
  };

  const handleSubmitResumeData = async () => {
    setIsLoading(true);
    try {
      const method = 'POST';
      const data = setPayload();
      //   console.log('data', data);

      const route = ENUM.POST_RESUME_DATA;
      const resp = await myAxiosWithAuthFetchWithPayload({
        method,
        route,
        token,
        data,
      });
      //   console.log('response', resp);
      if (resp?.status === true) {
        setReset(true);
        setIsLoading(false);
        setToggleSuccessMsg(true);
        settOggleOtherForms(false);
        setUploadResume(false);
      }
    } catch (error) {
      setIsLoading(false);
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Layoutwrapper>
        <div className="flex flex-col w-full mb-5 mx-auto">
          <PageSubTitle
            title="Resume"
            // subTitle="Here, you can upload your resume or create a custom one"
            subTitle="Here, you can upload your resume"
            needRoute={false}
          />
          <InnerLayoutWrapper>
            <MatchResumeComp />
            <ResumePageTopContainer
              handleUploadResume={handleUploadResume}
              setSearchKeyWord={setSearchKeyWord}
              resumeListData={resumeListData}
              handleTogleResumeLimit={handleTogleResumeLimit}
              userSubPlan={userSubPlan}
              handleFreePlanResumeLimit={handleFreePlanResumeLimit}
            />
            {isFetching ? (
              <TableLoadingComp />
            ) : resumeListData?.count > 0 ? (
              <ResumeListTable
                searchKeyword={searchKeyWord}
                data={data}
                resumeListData={resumeListData}
                setReset={setReset}
              />
            ) : (
              <EmptyResumeComp message="No resume yet" />
            )}
          </InnerLayoutWrapper>
        </div>
      </Layoutwrapper>
      {uploadResume && (
        <UploadResumeModal
          toggleModal={handleUploadResume}
          fileToUploadData={fileToUploadData}
          setResponseFromAI={setResponseFromAI}
          handleToggleOtherForms={handleToggleOtherForms}
          setUploadedResumeDets={setUploadedResumeDets}
          userSubPlan={userSubPlan}
          handleTogleNoPlan={handleTogleNoPlan}
          resumeListData={resumeListData}
        />
      )}
      {toggleNoPlan ? <NoPlanModal toggleModal={handleTogleNoPlan} /> : null}
      {toggleOtherForms ? (
        <OtherFormsModal
          toggleModal={handleToggleOtherForms}
          handleToggleSuccessModal={handleToggleSuccessModal}
          otherFomrSTate={otherFomrSTate}
          setOtherFomrSTate={setOtherFomrSTate}
          setSponsorshipForEmploymentVisa={setSponsorshipForEmploymentVisa}
          setActiveSecurityClearance={setActiveSecurityClearance}
          handleSubmitResumeData={handleSubmitResumeData}
          isLoading={isLoading}
        />
      ) : null}

      {toggleSuccessMsg ? (
        <ResumeSubmitedModal toggleModal={handleToggleSuccessModal} />
      ) : null}
      {toggleresumeLimit ? (
        <ResumeLimitModal toggleModal={handleTogleResumeLimit} />
      ) : null}

      {toggleFreePlanResumeLimit ? (
        <FreePlanResumeUploadLimit toggleModal={handleFreePlanResumeLimit} />
      ) : null}

      <ToastContainer />
    </>
  );
};

export default ResumesList;
