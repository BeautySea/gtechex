import React, { useEffect, useState } from 'react';
import ResumeBuilderSideBar from '../../modules/aiBuildResumeModule/ResumeBuilderSideBar';
import PageSubTitle from '../../layouts/PageSubTitle';
import BuildResumePersonalInfo from '../../modules/aiBuildResumeModule/PersonalInfo';
import TabPageWRapper from '../../modules/aiBuildResumeModule/TabPageWRapper';
import ResumeAddSkillsFormComponent from '../../modules/aiBuildResumeModule/ResumeAddSkillsFormComponent';
import ResumeAddCErtificationFormComponent from '../../modules/aiBuildResumeModule/ResumeAddCErtificationFormComponent';
import ResumeAddWorkExperienceComponenet from '../../modules/aiBuildResumeModule/ResumeAddWorkExperienceComponenet';
import ResumeAddEducationComponent from '../../modules/aiBuildResumeModule/ResumeAddEducationComponent';
import axios from 'axios';
import { showToastErrorMessage } from '../../common/toast';

interface compProps {
  resumeDets: any;
}

const ResumeBuilderPage = ({ resumeDets }: compProps) => {
  const RESUME_BASE_URL = import.meta.env.VITE_AI_RESUME_BASE_URL;
  const token = localStorage.getItem('authToken') || '';
  const [switchTab, setSwitchTab] = useState('Personal Information');
  const [isLoading, setIsLoading] = useState(false);
  const [educationData, setEducationData] = useState<any>({
    school_name: '',
    certification: '',
    course_study: '',
    start_year: '',
    end_year: '',
  });
  const [experienceData, setExperienceData] = useState<any>({
    company_name: '',
    position: '',
    experience_responsibilities: [],
    start_year: '',
    end_year: '',
    currentWork: '',
  });
  const [formData, setFormData] = useState<any>({
    personalInfo: null,
    education: null,
    experience: null,
    userProfile: null,
    certification: null,
    skills: null,
  });

  useEffect(() => {
    if (formData?.education !== null) {
      setEducationData(() => {
        const manipulatedData = formData?.education?.education.map(
          (item: any) => ({
            ...item,
            start_year: Number(item.start_year.split('-')[0]),
            end_year: Number(item.end_year.split('-')[0]),
          })
        );
        return manipulatedData;
      });
    }
  }, [formData]);
  useEffect(() => {
    if (formData?.experience) {
      setExperienceData(() => {
        const manipulatedData = formData?.experience?.experiences.map(
          (item: any) => ({
            ...item,
            start_year: Number(item.start_year.split('-')[0]),
            end_year: Number(item.end_year.split('-')[0]),
          })
        );
        return manipulatedData;
      });
    }
  }, [formData]);

  console.log('educationData', educationData);

  const setPayload = () => {
    const payload: any = {
      full_name: formData?.personalInfo ? formData.personalInfo?.fullName : '',
      email: formData?.personalInfo ? formData.personalInfo?.email : '',
      phone_number: formData?.personalInfo
        ? formData.personalInfo?.phoneNumber
        : '',
      gender: formData?.personalInfo ? formData.personalInfo?.gender : '',
      country: formData?.personalInfo ? formData.personalInfo?.country : '',
      state: formData?.personalInfo ? formData.personalInfo?.state : '',
      job_title: formData?.personalInfo ? formData.personalInfo?.jobTitle : '',
      portfolio_website: formData?.personalInfo
        ? formData.personalInfo?.PortfolioWebsite
        : '',
      github_url: formData?.personalInfo
        ? formData.personalInfo?.GitHubURL
        : '',
      linkedin_url: formData?.personalInfo
        ? formData.personalInfo?.LinkedInURL
        : '',
      dribble_url: formData?.personalInfo
        ? formData.personalInfo?.DribbbleURL
        : '',
      profile_certifications: formData?.certification?.certifications || [],
      profile_educations: educationData || [],
      profile_experiences: experienceData || [],
      profile_skills: formData?.skills?.skills || [],
    };
    return payload;
  };

  const handleBuildResume = async () => {
    setIsLoading(true);
    const payload = await setPayload();
    console.log('payload', payload);

    if (!payload) {
      setIsLoading(false);
      return;
    }
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer ' + token);
      // const config = {
      //   headers: {
      //     // 'content-type': 'multipart/form-data',
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      //     // Authorization: `Bearer ${token}`,
      //     Authorization: 'Bearer ' + token,
      //   },
      // };
      // const response = await axios.post(
      //   `${RESUME_BASE_URL}:75/build`,
      //   payload,
      //   config
      // );

      fetch('https://build.cloutra.com/build/', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: 'follow',
      })
        .then((response) => response.json())
        .then((result) => {
          console.log('this is the result', result);
          if (result?.status === 201) {
            setIsLoading(false);
            console.log('result', result?.data);
          }
        })
        .catch((error: any) => {
          if (error) {
            setIsLoading(false);

            if (error?.name === 'AxiosError') {
              if (error?.response?.status === 401) {
                showToastErrorMessage('Something went wrong! Try again.');
              } else {
                showToastErrorMessage(error?.message);
              }
            } else {
              showToastErrorMessage('Something went wrong! Try again.');
            }
          }
        });
      // if (response?.status === 201) {
      //   seIsLoading(false);
      //   console.log('response', response?.data?.data);
      // }
    } catch (error) {
      console.log('there was an error', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (formData.personalInfo !== null) {
      setSwitchTab('Skills');
    }
    if (formData.skills !== null) {
      setSwitchTab('Certification');
    }
    if (formData.certification !== null) {
      setSwitchTab('Work Experience');
    }
    if (formData.experience !== null) {
      setSwitchTab('Education');
    }
    if (formData.education !== null && educationData.length > 0) {
      handleBuildResume();
    }
  }, [formData]);

  return (
    <>
      <PageSubTitle
        title="AI Resume Builder"
        subTitle="Build your professional resume with our AI"
        needRoute={true}
        routeTo="ai-resume-builder"
      />
      <div
        className="flex items-center  lg:justify-between  w-full h-auto gap-[60px]"
        // style={{ height: 'calc(100vh - 145px)', overflowY: 'hidden' }}
      >
        <ResumeBuilderSideBar setSwitchTab={setSwitchTab} />
        <div className="max-w-[754px]  mx-auto flex flex-col gap-[20px] h-screen">
          <div className="w-full bg-[#FFFFFF] border border-[#E5E6EC] py-[8px] px-[12px] flex items-center justify-start rounded mt-[40px]">
            <div className="flex flex-col gap-[12px]">
              <h3 className="text-[#414343] text-xs">Resume Name</h3>
              <h3 className="text-[#131D26] text-sm font-medium">
                {resumeDets.resName}
              </h3>
            </div>
          </div>
          {switchTab === 'Personal Information' && (
            <BuildResumePersonalInfo
              setFormData={setFormData}
              setSwitchTab={setSwitchTab}
              formData={formData}
            />
          )}
          {switchTab === 'Skills' && (
            <ResumeAddSkillsFormComponent
              setFormData={setFormData}
              setSwitchTab={setSwitchTab}
              formData={formData}
            />
          )}
          {switchTab === 'Certification' && (
            <ResumeAddCErtificationFormComponent
              setFormData={setFormData}
              setSwitchTab={setSwitchTab}
              formData={formData}
            />
          )}
          {switchTab === 'Work Experience' && (
            <ResumeAddWorkExperienceComponenet
              setFormData={setFormData}
              setSwitchTab={setSwitchTab}
              formData={formData}
            />
          )}
          {switchTab === 'Education' && (
            <ResumeAddEducationComponent
              setFormData={setFormData}
              setSwitchTab={setSwitchTab}
              formData={formData}
              isLoading={isLoading}
            />
          )}

          {/* */}
        </div>
      </div>
    </>
  );
};

export default ResumeBuilderPage;
