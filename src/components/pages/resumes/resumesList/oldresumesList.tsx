import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ResumeTopTab from '../../../modules/resumeModules/resumeTopTab';
import UploadedResume from '../../../modules/resumeModules/UploadedResume';
import AIResume from '../../../modules/resumeModules/AIResume';
import UploadResumeModal from '../../../modules/resumeModules/UploadResumeModal';
import { ResumeData } from '../../../../App';
import OldLayoutWrapper from '../../../layouts/OldLayoutWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageSubTitle from '../../../layouts/PageSubTitle';

interface stateProps {}

const ResumesList = () => {
  const [activeTab, setActiveTab] = useState('Uploaded');
  const [uploadResume, setUploadResume] = useState(false);

  const location = useLocation();
  const fileToUploadData = location.state && location.state;

  console.log('fileToUploadData', fileToUploadData);

  const handleUploadResume = () => {
    setUploadResume(!uploadResume);
  };

  useEffect(() => {
    if (fileToUploadData) {
      setUploadResume(true);
    }
  }, [fileToUploadData]);
  return (
    <>
      <OldLayoutWrapper>
        {/* <div className={styles.resumesList}> */}
        {/* <PageSubTitle
          title="Account"
          subTitle="Manage your profile, subscription, and transaction history here"
          needRoute={false}
        /> */}
        <div className="flex flex-col w-full">
          {/* top navigation bar */}

          <div className="flex justify-between h-[70px] border-b border-[#C5C5C5]">
            {/* nav bar */}
            {/* <div className="flex items-end">
              <ResumeTopTab setActiveTab={setActiveTab} activeTab={activeTab} />
            </div> */}
            {/* CTA container */}
            <div className="flex items-center gap-[11px]">
              <div className="flex items-center justify-center">
                <Link to="/resumes/create">
                  <button
                    type="button"
                    className="flex items-center justify-center text-[#131D26] text-base font-medium bg-[#fff] border border-[#131D26] md:w-[173px] md:h-[44px] rounded-[8px]"
                  >
                    Create AI resume
                  </button>
                </Link>
              </div>
              {/* <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleUploadResume}
                  className="flex items-center justify-center text-[#F6D251] text-base font-medium bg-[#1F1F1F] md:w-[173px] md:h-[44px] rounded-[8px]"
                >
                  Upload new resume
                </button>
              </div> */}
            </div>
          </div>
          <div className="w-full mt-[50px] mb-5">
            {activeTab === 'Uploaded' && <UploadedResume />}
            {activeTab === 'AI' && <AIResume />}
          </div>
        </div>
      </OldLayoutWrapper>
      {/* {uploadResume && (
        <UploadResumeModal
          toggleModal={handleUploadResume}
          fileToUploadData={fileToUploadData}
        />
      )} */}
      <ToastContainer />
    </>
  );
};

export default ResumesList;
