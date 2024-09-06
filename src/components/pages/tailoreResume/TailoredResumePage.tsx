import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Layoutwrapper from '../../layouts/layoutwrapper';
import PageSubTitle from '../../layouts/PageSubTitle';
import InnerLayoutWrapper from '../../layouts/InnerLayoutWrapper';
import { DownloadIcon, WhiteCheckIcon } from '../../common/Icons';
import { useLocation, useNavigate } from 'react-router-dom';
import PersonalInformation from '../../modules/tailorResumeModule/NewPersonalInfo';
import Objectives from '../../modules/tailorResumeModule/Objectives';
import SkillsComponent from '../../modules/tailorResumeModule/SkillsComponent';
import CertificationComponent from '../../modules/tailorResumeModule/CertificationComponent';
import EducationComponent from '../../modules/tailorResumeModule/EducationComponent';
import WorkExperienceForm from '../../modules/tailorResumeModule/WorkExpereinceComp';
import ResumeTemplatePreview from '../../modules/tailorResumeModule/ResumeTemplatePreview';
import ENUM from '../../../service/enum';
import { myAxiosWithAuthFetchWithPayload } from '../../../api/normalRequest';
import Language from '../resumes/createResume/language/language';
import CustomSpin from '../../common/CustomSpin';

interface PersonalInformation {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  personal_website: string;
}

interface Education {
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
}

interface Responsibility {
  responsibility: string;
}

interface WorkExperience {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  responsibility: string;
  rewritten_responsibility: Responsibility[];
}

interface Skill {
  name: string;
  proficiency_level: string;
  years_of_experience: string;
}

interface Certification {
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date: string;
}

interface FormData {
  personal_information: PersonalInformation;
  education: Education[];
  work_experience: WorkExperience[];
  skills: Skill[];
  certifications: Certification[];
  objective: string;
}

export interface PersonalInfoFormData {
  full_name: string;
  email: string;
  phone: string;
  linkedin: string;
}

export interface Skills {
  id: number;
  name: string;
  proficiency_level?: string;
  years_of_experience?: string;
}

const TailoredResumePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken') || '';
  const [isSavingResume, setIsSavingResume] = useState(false);
  const [resumeData, setResumeData] = useState<any | null>({
    personal_information: {
      full_name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      personal_website: '',
    },
    objective: '',
    education: [],
    work_experience: [],
    skills: [],
    certifications: [],
  });
  const [formData, setFormData] = useState<any>({
    personal_information: {
      full_name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      personal_website: '',
    },
    objective: '',
    education: [],
    work_experience: [],
    skills: [],
    certifications: [],
  });
  const resumeRef = useRef<HTMLDivElement>(null);
  const [resumeObjevtives, setResumeObjectives] = useState('');

  const location = useLocation();
  const tailuredResumeData = location.state && location.state.data;
  const tailuredResumeFile = location.state && location.state.resumeFile;
  const copiedData = JSON.parse(JSON.stringify(tailuredResumeData));

  console.log('copiedData', copiedData?.personal_information);

  useEffect(() => {
    setFormData({
      ...formData,
      personal_information: copiedData?.personal_information,
      education: copiedData?.education,
      work_experience: copiedData?.work_experience,
      skills: copiedData?.skills,
      certifications: copiedData?.certifications,
      objective: copiedData?.objective,
    });
  }, []);

  useEffect(() => {
    setResumeData({
      ...resumeData,
      personal_information: tailuredResumeData[0]?.personal_information,
      education: tailuredResumeData[0]?.education,
      work_experience: tailuredResumeData[1]?.work_experience,
      skills: tailuredResumeData[2]?.skills,
      certifications: tailuredResumeData[2]?.certifications,
      objective: tailuredResumeData[1]?.objective,
    });
  }, [tailuredResumeData]);

  const handleUpdateReview = () => {
    const deepCopiedFormData = JSON.parse(JSON.stringify(formData));
    setResumeData(deepCopiedFormData);
  };
  const handleInputChange = (
    section: string,
    e: any,
    id: any,
    responsibilityIndex?: any
  ) => {
    const updatedFormData = { ...formData };
    const { name, value, checked, type } = e.target;

    if (section === 'personal_information') {
      updatedFormData.personal_information[name] = value;
    } else if (section === 'education' && id !== null) {
      updatedFormData.education = updatedFormData.education.map(
        (education: Education, i: number) =>
          i === id ? { ...education, [name]: value } : education
      );
    } else if (section === 'objective') {
      updatedFormData.objective = value;
    } else if (section === 'skills' && id !== null) {
      console.log('skill index', {
        ...updatedFormData.skills[id],
        [name]: value,
      });
      updatedFormData.skills[id] = {
        ...updatedFormData.skills[id],
        [name]: value,
      };
    } else if (section === 'work_experience' && id !== null) {
      if (responsibilityIndex !== undefined) {
        updatedFormData.work_experience[id].rewritten_responsibility[
          responsibilityIndex
        ].responsibility = value;
      } else {
        updatedFormData.work_experience[id] = {
          ...updatedFormData.work_experience[id],
          [name]: type === 'checkbox' ? checked : value,
        };
      }
    } else if (section === 'certifications' && id !== null) {
      updatedFormData.certifications[id] = {
        ...updatedFormData.certifications[id],
        [name]: value,
      };
    }
    setFormData(updatedFormData);
  };

  const addSkill = () => {
    const newSkill = {
      name: '',
      proficiency_level: '',
      years_of_experience: '',
    };
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      skills: [...prevFormData.skills, newSkill],
    }));
  };

  const removeSkill = (index: number) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      skills: prevFormData.skills.filter((_: any, i: any) => i !== index),
    }));
  };

  const downloadPDF = async () => {
    if (resumeRef.current) {
      const canvas = await html2canvas(resumeRef.current);
      console.log('canvas', canvas);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${formData?.personal_information?.full_name}`);
    }
  };

  const setPayload = () => {
    const payload: any = {
      type: 'custom',
      file: {
        name: `${tailuredResumeFile?.name} tailored`,
        size: tailuredResumeFile?.size,
        location: tailuredResumeFile?.location,
        key: tailuredResumeFile?.key,
      },
      profile: {
        personalInfo: {
          state: resumeData?.personal_information?.address || 'null',
          country: resumeData?.personal_information?.address || 'null',
          gender: resumeData?.personal_information?.gender || 'null',
          phoneNo: resumeData?.personal_information?.phone || 'null',
          summary: resumeData?.personal_information?.summary || 'null',
          email: resumeData?.personal_information?.email || 'null',
          fullName: resumeData?.personal_information?.full_name || 'null',
          portfoloWebsite:
            resumeData?.personal_information?.personal_website || 'null',
          github: resumeData?.personal_information?.github || 'null',
          linkedIn: resumeData?.personal_information?.linkedin || 'null',
          dribble: resumeData?.personal_information?.dribble || 'null',
        },
        workExperience: resumeData?.work_experience,

        skills: resumeData?.skills,
        education: resumeData?.education,

        certifications: formData?.certifications || ['null'],
      },
    };

    return payload;
  };

  // isSavingResume, setIsSavingResume
  const handleSubmitResume = async () => {
    setIsSavingResume(true);
    const payload = await setPayload();
    if (!payload) {
      setIsSavingResume(false);
      return;
    }
    try {
      const method = 'POST';
      const data = payload;

      const route = ENUM.POST_RESUME_DATA;
      const resp = await myAxiosWithAuthFetchWithPayload({
        method,
        route,
        token,
        data,
      });
      console.log('resp', resp);
      if (resp?.status === true) {
        setIsSavingResume(false);
        navigate('/resumes');
      }
    } catch (error) {
      console.log('there was an error', error);
      setIsSavingResume(false);
    }
  };

  console.log('formData?.work_experience', formData?.work_experience);

  return (
    <>
      <Layoutwrapper>
        <div className="flex flex-col w-full mb-5 mx-auto overflow-y-auto h-auto">
          <PageSubTitle
            title="Tailor Resume to Job"
            subTitle="Upload or choose resume, enter job description, and match"
            needRoute={true}
            routeTo="tailor-resume"
          />
          <div className="flex items-center justify-between mx-auto w-full">
            <InnerLayoutWrapper>
              <div className="w-auto flex flex-col gap-[16px] h-[100vh] overflow-y-auto scrollbar-hide">
                <PersonalInformation
                  personalInfoData={formData?.personal_information}
                  handleInputChange={handleInputChange}
                />
                <Objectives
                  objectives={formData?.objective}
                  resumeObjevtives={resumeObjevtives}
                  setResumeObjectives={setResumeObjectives}
                  handleInputChange={handleInputChange}
                />
                <SkillsComponent
                  skillsData={formData?.skills}
                  handleInputChange={handleInputChange}
                  addSkill={addSkill}
                  removeSkill={removeSkill}
                />
                <CertificationComponent
                  certificationData={tailuredResumeData[2]?.certifications}
                  formData={formData}
                  setFormData={setFormData}
                  handleInputChange={handleInputChange}
                />
                <EducationComponent
                  educationAPIData={tailuredResumeData[0]?.education}
                  handleInputChange={handleInputChange}
                  formData={formData}
                  setFormData={setFormData}
                />
                {formData?.work_experience.length > 0 && (
                  <WorkExperienceForm
                    workExperienceData={formData?.work_experience || []}
                    formData={formData}
                    setFormData={setFormData}
                    handleInputChange={handleInputChange}
                  />
                )}

                <div className="w-full py-2 flex items-center justify-start space-x-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateReview()}
                    className="flex items-center justify-center py-[8px] px-[12px] rounded text-sm font-medium text-[#F6D155] bg-[#131D26]"
                  >
                    Update Preview
                  </button>
                  <button className="flex items-center justify-center py-[8px] px-[12px] rounded text-sm font-medium text-[#131D26] bg-[#A8A8AB33]">
                    Discard Changes
                  </button>
                </div>
              </div>
            </InnerLayoutWrapper>
            <div className="bg-[#fff] h-[100vh] overflow-y-auto scrollbar-hide  py-[20px] px-[10px] w-[50%] border-l border-[#E5E6EC]">
              {/* <div className="flex flex-col">
           
                <div className="flex items-center justify-start gap-[16px] bg-[#131D26] p-[24px]">
                  <div className="flex flex-col items-start">
                    <h3 className="text-[#F8F9FF] text-[20px] font-semibold">
                      Shodipo Michael
                    </h3>
                    <p className="text-[#C1C1C3] text-[14px] font-normal">
                      Product Designer & No-Code Developer
                    </p>
                  </div>
                </div>
            
                <div className="border border-[#E5E6EC] bg-[#fff] w-full py-[24px] px-[24px] flex flex-col gap-[16px]">
             
                  <div className="w-full flex flex-col gap-[12px]">
                    <h3 className="text-base text-[#131D26] font-semibold">
                      Personal Information
                    </h3>
                    <div className="py-[12px] px-[20px] rounded-[8px] flex flex-col gap-[5px] bg-[#ABABAB1F]">
                      <div className="flex items-center justify-start gap-[8px]">
                        <ProfileIcon />{' '}
                        <span className="text-[11px] text-[#414343]">
                          Shodipo Michael
                        </span>
                      </div>
                      <div className="flex items-center justify-start gap-[8px]">
                        <MessageIcon />{' '}
                        <span className="text-[11px] text-[#414343]">
                          shodipo87@gmail.com
                        </span>
                      </div>
                      <div className="flex items-center justify-start gap-[8px]">
                        <PhoneIcon />{' '}
                        <span className="text-[11px] text-[#414343]">
                          +1 (000) 111 2222
                        </span>
                      </div>
                    </div>
                  </div>
          
                  <div className="w-full flex flex-col gap-[12px]">
                    <h3 className="text-base text-[#131D26] font-semibold">
                      Work Experience
                    </h3>
                    <div className="py-[12px] px-[20px] rounded-[8px] flex flex-col gap-[8px] bg-[#ABABAB1F]">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-[4px]">
                          <h3 className="text-[#131D26] font-semibold text-base">
                            JPMorgan Chase & Co.
                          </h3>
                          <p className="text-[#414343] text-sm font-normal">
                            Sr. Cloud Security Engineer
                          </p>
                        </div>
                        <h3 className="text-[#131D26] font-semibold text-base">
                          April 2018 - Present
                        </h3>
                      </div>
                      <ul className="marker:text-[#131D26] marker:text-xs 2xl:marker:text-[24px] list-outside list-disc px-[12px]">
                        <li className="text-xs font-normal text-[#131D26]">
                          As a Senior Cloud Security Engineer, I was tasked with
                          ensuring the secure deployment and operation of
                          cloud-based infrastructure. My role involved
                          implementing robust security measures, performing
                          vulnerability assessments, and responding to security
                          incidents to protect against unauthorized access or
                          potential security threats. Leveraging my expertise in
                          scripting, network protocols, and cloud technologies,
                          I developed and maintained security practices that
                          aligned with industry standards and organizational
                          requirements."
                        </li>
                      </ul>
                    </div>
                  </div>
     
                  <div className="w-full flex flex-col gap-[12px]">
                    <h3 className="text-base text-[#131D26] font-semibold">
                      Education
                    </h3>
                    <div className="py-[12px] px-[20px] rounded-[8px] flex flex-col gap-[5px] bg-[#ABABAB1F]">
                      <div className="border-b border-[#E5E6EC] flex items-start pb-[10px]">
                        <h3 className="text-xs text-[#131D26] font-semibold">
                          University of Oxford
                        </h3>
                      </div>
                      <ul className="marker:text-[#131D26] marker:text-xs 2xl:marker:text-[24px] list-outside list-disc px-[12px]">
                        <li className="text-xs font-normal text-[#131D26]">
                          Master of Design
                        </li>
                      </ul>
                    </div>
                  </div>
   
                  <div className="w-full flex flex-col gap-[12px]">
                    <h3 className="text-base text-[#131D26] font-semibold">
                      Skills
                    </h3>
                    <TailuredResumeSkillsCardComp />
                    <TailuredResumeSkillsCardComp />
                    <TailuredResumeSkillsCardComp />
                  </div>
                  <div className="w-full flex flex-col gap-[12px]">
                    <h3 className="text-base text-[#131D26] font-semibold">
                      Certification
                    </h3>
                    <TailuredResumeCEertificationComp />
                    <TailuredResumeCEertificationComp />
                    <TailuredResumeCEertificationComp />
                  </div>
                </div>
              </div> */}
              <ResumeTemplatePreview
                previewResumeData={resumeData}
                resumeRef={resumeRef}
                downloadPDF={downloadPDF}
              />
              <div className="flex items-center justify-start w-full  mt-4 gap-[12px]">
                <button
                  type="button"
                  onClick={downloadPDF}
                  className="p-[8px] bg-[#A8A8AB33] flex items-center justify-center gap-[4px] text-xs font-normal text-[#414343] rounded"
                >
                  <DownloadIcon />
                  Download Resume
                </button>
                <button
                  type="button"
                  onClick={handleSubmitResume}
                  className="p-[8px] bg-[#219653] flex items-center justify-center gap-[4px] text-xs font-normal text-[#F8F9FF] rounded"
                >
                  <WhiteCheckIcon />

                  {isSavingResume ? (
                    <>
                      <span>Saving...</span>
                      <CustomSpin />
                    </>
                  ) : (
                    'Save Resume'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layoutwrapper>
    </>
  );
};

export default TailoredResumePage;
