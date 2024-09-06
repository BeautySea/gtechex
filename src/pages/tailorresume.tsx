import React, { useState } from 'react';
import Layoutwrapper from '../components/layouts/layoutwrapper';
import PageSubTitle from '../components/layouts/PageSubTitle';
import BorderWrapper from '../components/common/BorderWrapper';
import AITailorResume from '../components/modules/tailorResumeModule/AITailorResume';
import CustomLabel from '../components/common/Label';
import CustomDropdown from '../components/common/form/CustomDropDown';
import InnerLayoutWrapper from '../components/layouts/InnerLayoutWrapper';
import CustomSpin from '../components/common/CustomSpin';
import TailorResumeInfo from '../components/modules/aiBuildResumeModule/AIBuildResumeInfo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tailorresume = () => {
  const RESUME_BASE_URL = import.meta.env.VITE_AI_RESUME_BASE_URL;
  const [selectedResume, setSelectedResume] = useState('');
  const [resumeToScore, setResumeToScore] = useState<any>();
  const [selectedResumeName, setSelectedResumeName] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const token = localStorage.getItem('authToken') || '';
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setJobDescription(e.target.value);
  };
  const handleNextUIToRender = (nextUI: string) => {
    setTimeout(() => {
      // if (nextUIToRender === 'form') {
      //   setNextUIToRender('tailored');
      // } else {
      //   setNextUIToRender('form');
      // }
      navigate('/tailored-resume');
    }, 3000);
  };

  const handleTailureResumeFeature = async () => {
    setIsloading(true);
    try {
      const response2 = await fetch(resumeToScore?.location);
      console.log('response2', response2);

      const blob = await response2.blob();
      console.log('blob', blob);

      const file = new File([blob], resumeToScore.name, {
        type: blob.type,
      });
      // console.log('response2', file);
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('job_description', jobDescription);

      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + token);
      // const config = {
      //   headers: {
      //     'content-type': 'multipart/form-data',
      //     // 'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      //     Authorization: 'Bearer ' + token,
      //   },
      // };
      // const response = await axios.post(
      //   `${RESUME_BASE_URL}:5000/rewrite/`,
      //   formData,
      //   config
      // );

      fetch('https://rewrite.cloutra.com/rewrite/', {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow',
      })
        .then((response) => response.json())
        .then((result) => {
          console.log('this is the result', result);
          if (result && result?.status === 201) {
            setIsloading(false);
            navigate('/tailored-resume', {
              state: { data: result?.data, resumeFile: resumeToScore },
            });
          }
        })
        .catch((error: any) => {
          setIsloading(false);
          console.log('there was an error', error);
        });
    } catch (error) {
      setIsloading(false);
      console.log('there was an error', error);
    }
  };
  return (
    <>
      <Layoutwrapper>
        <div className="flex flex-col w-full mb-5 mx-auto overflow-y-auto h-auto">
          <PageSubTitle
            title="Tailor Resume to Job"
            subTitle="Upload or choose resume, enter job description, and match"
            needRoute={false}
          />
          <InnerLayoutWrapper>
            <div
              className="flex items-center flex-col lg:flex-row lg:justify-between  w-full  h-auto"
              // style={{ height: 'calc(100vh - 145px)', overflowY: 'hidden' }}
            >
              {/* <div className="self-start mx-auto mt-2 sticky top-0 w-auto"> */}
              <div className="flex justify-between self-start mx-auto mt-2 sticky top-0  w-full gap-[20px]">
                <TailorResumeInfo />
                <div>
                  <BorderWrapper bg="#fff">
                    <AITailorResume />
                    <BorderWrapper bg="#fff">
                      <div
                        className="
                     flex flex-col items-start w-full lg:w-[657px]"
                      >
                        <div className="mb-2 w-full">
                          <CustomLabel
                            htmlFor="resume"
                            required={true}
                            text="Choose resume"
                            className="block mb-2 text-sm font-semibold text-[#131D26]  "
                          />
                          <CustomDropdown
                            setSelectedResume={setSelectedResume}
                            setSelectedResumeName={setSelectedResumeName}
                            setResumeToScore={setResumeToScore}
                          />
                        </div>
                        <div className="mb-2 w-full">
                          <CustomLabel
                            htmlFor="jobDescription"
                            required={true}
                            text="Enter Job Description"
                            className="block mb-2 text-sm font-semibold text-[#131D26]  "
                          />
                          {/* #ABABAB33 */}
                          <textarea
                            name="jobDescription"
                            id="jobDescription"
                            value={jobDescription}
                            onChange={handleChange}
                            cols={30}
                            rows={5}
                            className={`border border-[#E5E6EC] w-full py-[8px] px-[12px] text-xs text-[#131D26] rounded-[4px] ${
                              isLoading ? 'bg-[#ABABAB33]' : 'bg-[#fff]'
                            }  placehlder:text-[#414343] placeholder:text-xs`}
                            placeholder="Type or paste job description here..."
                          ></textarea>
                        </div>
                      </div>
                    </BorderWrapper>
                    <div className="w-full flex items-center justify-start py-3">
                      {selectedResume === '' ? (
                        <button
                          type="button"
                          className="py-2 px-3 rounded bg-[#131d264d] text-[#F6D155] text-xs font-medium cursor-not-allowed"
                        >
                          Tailor Resume
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleTailureResumeFeature()}
                          className="py-2 px-3 rounded bg-[#131D26] text-[#F6D155] text-xs font-medium"
                        >
                          {isLoading ? <CustomSpin /> : 'Tailor Resume'}
                        </button>
                      )}
                    </div>
                  </BorderWrapper>
                </div>
              </div>
            </div>
          </InnerLayoutWrapper>
        </div>
      </Layoutwrapper>
    </>
  );
};

export default Tailorresume;
