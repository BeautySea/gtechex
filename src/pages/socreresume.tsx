import React, { useState } from 'react';
import axios from 'axios';
import Layoutwrapper from '../components/layouts/layoutwrapper';
import PageSubTitle from '../components/layouts/PageSubTitle';
import InnerLayoutWrapper from '../components/layouts/InnerLayoutWrapper';
import BorderWrapper from '../components/common/BorderWrapper';
import CustomLabel from '../components/common/Label';
import OrdinaryCustomLabel from '../components/common/OrdinaryCustomLabel';
import CustomDropdown from '../components/common/form/CustomDropDown';
import AIScoreResume from '../components/modules/overviewmodules/AIScoreResume';
import { useNavigate } from 'react-router-dom';
import ScoreResumeInfo from '../components/modules/scoreResumeModule/ScoreResumeInfo';
import Spinner from '../components/common/spinner/Spinner';
import AnalyzingResumeModal from '../components/modules/scoreResumeModule/AnalyzingResumeModal';

type formToRender = 'choose' | 'analyze';

const Socreresume = () => {
  const [toggleAnalyseResumeModalPage, setAnalyseResumeModalPage] =
    useState(true);
  const RESUME_BASE_URL = import.meta.env.VITE_AI_RESUME_BASE_URL;
  const [jobTitle, setJobTitle] = useState('');
  const [resumeToScore, setResumeToScore] = useState<any>();
  const [selectedResume, setSelectedResume] = useState('');
  const [selectedResumeName, setSelectedResumeName] = useState('');
  const [formToRender, setFormToRender] = useState<formToRender>('choose');
  const token = localStorage.getItem('authToken') || '';
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setJobTitle(e.target.value);
  };

  console.log('selectedResume', resumeToScore);

  const handleToggleSidePage = async () => {
    // setAnalyseResumeModalPage(!toggleSidePage);
    setIsloading(true);
    setAnalyseResumeModalPage(true);
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
      formData.append('career_name', jobTitle);
      // const config = {
      //   headers: {
      //     'content-type': 'multipart/form-data',
      //     // 'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      //     // Authorization: `Bearer ${token}`,
      //     Authorization: 'Bearer ' + token,
      //   },
      // };
      // https://analyze.cloutra.com
      // http://ec2-18-209-224-82.compute-1.amazonaws.com/analyze/
      // const response = await axios.post(
      //   `${RESUME_BASE_URL}/analyze/`,
      //   formData,
      //   config
      // );

      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + token);

      fetch('https://analyze.cloutra.com/analyze/', {
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
            setAnalyseResumeModalPage(false);
            navigate('/resume-analysis', { state: { data: result?.data } });
          }
        });
    } catch (error) {
      setIsloading(false);
      setAnalyseResumeModalPage(false);
    }
  };

  const handleNextFormToRender = (currentForm: string) => {
    if (currentForm === 'choose') {
      setFormToRender('analyze');
    } else {
      setFormToRender('choose');
    }
  };

  const handleToggleAnalyseModal = () => {
    setAnalyseResumeModalPage(!toggleAnalyseResumeModalPage);
  };

  return (
    <>
      <Layoutwrapper>
        <div className="flex flex-col w-full mb-5 mx-auto overflow-y-auto h-auto">
          <PageSubTitle
            title="AI Score Resume"
            subTitle="Find out your resume score"
            needRoute={false}
            routeTo="resumes"
          />
          <InnerLayoutWrapper>
            <div
              className="flex items-center flex-col lg:flex-row lg:justify-between  w-full  h-auto"
              // style={{ height: 'calc(100vh - 145px)', overflowY: 'hidden' }}
            >
              {/* left contianer */}
              {formToRender === 'choose' && (
                <div className="flex justify-between self-start mx-auto mt-2 sticky top-0  w-full gap-[20px]">
                  <ScoreResumeInfo />
                  <div>
                    <BorderWrapper bg="#fff">
                      <AIScoreResume />
                      <BorderWrapper bg="#fff">
                        <div className="flex flex-col items-start w-full lg:w-[657px]">
                          <div className="mb-2 w-full">
                            <CustomLabel
                              htmlFor="resume"
                              required={true}
                              text="Choose resume"
                              className="block mb-2 text-sm font-medium text-gray-900 "
                            />
                            <CustomDropdown
                              setSelectedResume={setSelectedResume}
                              setSelectedResumeName={setSelectedResumeName}
                              setResumeToScore={setResumeToScore}
                            />
                          </div>
                        </div>
                      </BorderWrapper>
                      <div className="w-full flex items-center justify-start py-3">
                        {selectedResume === '' ? (
                          <button
                            type="button"
                            className="py-2 px-3 rounded bg-[#131d264d] text-[#F6D155] text-xs font-medium cursor-not-allowed"
                          >
                            Next
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleNextFormToRender('choose')}
                            className="py-2 px-3 rounded bg-[#131D26] text-[#F6D155] text-xs font-medium"
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </BorderWrapper>
                  </div>
                </div>
              )}
              {formToRender === 'analyze' && (
                <div className="self-start mx-auto mt-2 sticky top-0 flex justify-center gap-[20px]">
                  <ScoreResumeInfo />
                  <div>
                    <BorderWrapper bg="#fff">
                      <BorderWrapper bg="#fff">
                        {isLoading ? (
                          <div
                            className="
                   flex items-center justify-center w-full lg:w-[657px]"
                          >
                            <Spinner />
                          </div>
                        ) : (
                          <div
                            className="
                    flex flex-col items-start w-full lg:w-[657px]"
                          >
                            <div className="mb-2 w-full">
                              <CustomLabel
                                htmlFor="jobTitle"
                                required={true}
                                text="Job Title"
                                className="block mb-2 text-sm font-medium text-[#414343] "
                              />
                              <input
                                type="text"
                                id="jobTitle"
                                name="jobTitle"
                                value={jobTitle}
                                onChange={handleChange}
                                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[95%] px-4 py-2"
                                placeholder="Enter job title"
                              />
                            </div>
                            <div className="relative mt-[26px] mb-5 mx-auto w-full flex flex-col items-start gap-[4px]">
                              <div className="w-[95%] ">
                                <OrdinaryCustomLabel
                                  htmlFor="jobTitle"
                                  text="Your Resume"
                                  className="block mb-2 text-sm font-medium text-[#414343] "
                                />
                                <div className="border-2 border-dashed border-[#C7C9D6] rounded bg-[#A8A8AB1F] py-2 px-3 w-full text-start">
                                  <span className="text-xs font-medium text-[#131D26]">
                                    {selectedResumeName}
                                  </span>
                                </div>
                              </div>
                              <div className="w-[95%] flex items-center justify-end mt-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleNextFormToRender('analyze')
                                  }
                                  className="inline-flex items-center justify-center bg-[#A8A8AB33] rounded text-[#131D26] text-xs font-medium py-2 px-3 justify-self-end self-end"
                                >
                                  Replace Resume
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </BorderWrapper>
                      <div className="w-full flex items-center justify-start py-3">
                        {jobTitle === '' ? (
                          <button
                            type="button"
                            className="py-2 px-3 rounded bg-[#131d264d] text-[#F6D155] text-xs font-medium cursor-not-allowed"
                          >
                            Analyse Resume
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleToggleSidePage}
                            className="py-2 px-3 rounded bg-[#131D26] text-[#F6D155] text-xs font-medium"
                          >
                            {isLoading
                              ? ' Analyzing Resume ...'
                              : ' Analyse Resume'}
                          </button>
                        )}
                      </div>
                    </BorderWrapper>
                  </div>
                </div>
              )}

              {/* right container */}
              {/* <ScoreResumeSidePage toggleSidePage={toggleSidePage} /> */}
            </div>
          </InnerLayoutWrapper>
        </div>
      </Layoutwrapper>
      {/* {toggleAnalyseResumeModalPage && (
        <AnalyzingResumeModal toggleModal={handleToggleAnalyseModal} />
      )} */}
    </>
  );
};

export default Socreresume;
