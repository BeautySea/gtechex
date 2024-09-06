import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomSpin from '../../common/CustomSpin';
import { showToastErrorMessage } from '../../common/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonRounded from '../../common/buttons/ButtonRounded';
import { fileUpload } from '../../../api/normalRequest';
import Spinner from '../../common/spinner/Spinner';

interface upgradeProps {
  toggleModal: () => void;
  fileToUploadData?: any;
  setResponseFromAI?: any;
  userSubPlan?: any;
  resumeListData?: any;
  // toggleOtherForms: boolean;
  // settOggleOtherForms: React.Dispatch<React.SetStateAction<boolean>>;
  handleToggleOtherForms: () => void;
  handleTogleNoPlan: () => void;
  setUploadedResumeDets: any;
  //   setResumeData: React.Dispatch<React.SetStateAction<ResumeData | null>>;
}
const UploadResumeModal = ({
  toggleModal,
  fileToUploadData,
  setResponseFromAI,
  handleToggleOtherForms,
  setUploadedResumeDets,
  handleTogleNoPlan,
  resumeListData,
  userSubPlan,
}: // toggleOtherForms,
// settOggleOtherForms,

upgradeProps) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<any>(null);
  const [fileTypeError, setFileTypeError] = useState('');
  const [toggleSuccessMsg, setToggleSuccessMsg] = useState(false);
  const RESUME_BASE_URL = import.meta.env.VITE_AI_RESUME_BASE_URL;
  const [uploadState, setUploadState] = useState('Upload');
  const token = localStorage.getItem('authToken') || '';
  const [fileDets, setFileDets] = useState({
    name: '',
    size: '',
  });

  const navigate = useNavigate();

  // const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];

  //   if (file) {
  //     console.log('uploaded file', file);
  //     setFiles(file);
  //     setFileDets({
  //       name: file.name,
  //       size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
  //     });
  //   } else {
  //     // Handle case when no file is selected
  //     setFileDets({
  //       name: '',
  //       size: '',
  //     });
  //   }
  // };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Get the file extension
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      // Allowed file extensions
      const allowedExtensions = ['doc', 'docx', 'pdf', 'txt'];

      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        console.log('Uploaded file:', file);
        setFiles(file);
        setFileDets({
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        });
        setFileTypeError('');
      } else {
        // Handle case when file type is not allowed
        console.error(
          'File type not allowed. Please select a .doc, .docx, .pdf, or .txt file.'
        );
        setFileTypeError('Invalid file format');
      }
    } else {
      // Handle case when no file is selected
      setFileDets({
        name: '',
        size: '',
      });
      setFileTypeError('');
    }
  };

  useEffect(() => {
    if (fileToUploadData) {
      if (fileToUploadData.fileData) {
        // console.log('fileData', fileToUploadData.fileData.name);
        setFiles(fileToUploadData.fileData);
        setFileDets({
          name: fileToUploadData.fileData.name,
          size: `${(fileToUploadData.fileData.size / (1024 * 1024)).toFixed(
            2
          )} MB`,
        });
      }
    }
  }, [fileToUploadData]);

  //   resumes/confirm
  const handleDeleteFile = () => {
    setFiles(null);
  };
  // http://ec2-18-209-224-82.compute-1.amazonaws.com/generate/
  console.log('files', files);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setUploadState('Fetching data');

      const formData = new FormData();

      formData.append('resume', files);
      formData.append('fileName', files.name);

      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + token);

      const fileUploadResp = await fileUpload(files);

      // const payload = { resume: formData };
      // ${RESUME_BASE_URL}
      //generate.applyquick.ai
      // /generate
      // https://generate.applyquick.ai/generate
      // http://ec2-34-224-83-53.compute-1.amazonaws.com:90/generate
      // https://generate.cloutra.com
      if (fileUploadResp?.data) {
        setUploadedResumeDets(fileUploadResp?.data[0]);

        fetch('https://generate.cloutra.com/generate/', {
          method: 'POST',
          headers: myHeaders,
          body: formData,
          redirect: 'follow',
        })
          .then((response) => response.json())
          .then((result) => {
            if (result && result?.status === 201) {
              if (result?.data) {
                setLoading(false);
                setResponseFromAI(result?.data);
                toggleModal();
                handleToggleOtherForms();
              }
            }
          })
          .catch((error: any) => {
            if (error) {
              setLoading(false);

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
      } else if (fileUploadResp?.error) {
        showToastErrorMessage(fileUploadResp?.errorMessage);
      } else {
        showToastErrorMessage('Something went wrong! Try again.');
      }
    } catch (error: any) {
      if (error) {
        setLoading(false);

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
    } finally {
      setLoading(false);
    }
  };

  // ResumeSubmitedModal
  // const handleToggleOtherForms = () => {
  //   settOggleOtherForms(!toggleOtherForms);
  // };
  // const handleToggleSuccessModal = () => {
  //   settOggleOtherForms(!toggleOtherForms);
  //   setToggleSuccessMsg(!toggleSuccessMsg);
  // };

  const handleManageSub = () => {
    toggleModal();
    handleTogleNoPlan();
  };

  return (
    <>
      <div
        tabIndex={-1}
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#131d2680] h-screen"
      >
        <div className="relative p-4 w-full max-w-lg max-h-full mx-auto">
          {loading ? (
            <Spinner />
          ) : (
            <div className="relative bg-white rounded-lg shadow p-4">
              <div className="w-full flex items-center justify-between">
                <h3 className="text-base text-[#131D26] font-semibold">
                  Upload Resume
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {files === undefined || files === null ? (
                <div className="p-4 md:p-5 flex flex-col text-center border-2 border-dashed border-[#C7C9D6] rounded-lg my-4">
                  <div className="relative  mt-[26px] mb-5 mx-auto w-[90%] text-center flex flex-col items-center justify-center">
                    <input
                      type="file"
                      className="hidden"
                      id="fileInput"
                      accept=".pdf, .doc, .docx, .txt"
                      name="resume"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer appearance-none p-2 bg-[#fff] bg-opacity-10 w-full 2xl:max-w-[297px] w-full flex items-center justify-center flex-col gap-[8px]"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.2525 2C13.5 2 13.7079 2.21 13.7079 2.46V5.68C13.7079 7.51 15.1931 9.01 17.0149 9.02C17.7574 9.02 18.3515 9.03 18.8069 9.03C19.1139 9.03 19.6188 9.02 20.0446 9.02C20.2921 9.02 20.5 9.22 20.5 9.47V17.51C20.5 19.99 18.5 22 16.0446 22H8.17327C5.58911 22 3.5 19.89 3.5 17.29V6.51C3.5 4.03 5.4901 2 7.96535 2H13.2525ZM11.6386 8.74C11.5396 8.74 11.4406 8.76 11.3515 8.8C11.2624 8.84 11.1832 8.89 11.1139 8.96L8.28218 11.84C7.99505 12.13 7.99505 12.6 8.28218 12.89C8.56931 13.18 9.03465 13.18 9.32178 12.89L10.896 11.29V16.12C10.896 16.53 11.2228 16.86 11.6386 16.86C12.0446 16.86 12.3713 16.53 12.3713 16.12V11.29L13.9455 12.89C14.2327 13.18 14.698 13.18 14.9851 12.89C15.2822 12.6 15.2822 12.13 14.995 11.84L12.1535 8.96C12.0842 8.89 12.005 8.84 11.9158 8.8C11.8267 8.76 11.7376 8.74 11.6386 8.74ZM15.1452 2.906C15.1452 2.475 15.6621 2.261 15.9581 2.572C17.0294 3.696 18.8997 5.661 19.9452 6.759C20.2334 7.062 20.0215 7.565 19.6047 7.566C18.7908 7.569 17.8324 7.566 17.1423 7.559C16.0472 7.559 15.1452 6.648 15.1452 5.542V2.906Z"
                          fill="#131D26"
                        />
                      </svg>
                      <span className="text-gray-600 text-sm font-medium mt-2 text-center">
                        <b className="text-[#EB5757]">Click to add</b> or drop
                        here
                      </span>
                    </label>
                    <div className="mt-3">
                      <span className="text-xs text-[#414343] font-medium">
                        Supported file: PDF, DOC, TXT (Max. 5MB)
                      </span>
                    </div>
                    {fileTypeError ? (
                      <span className="text-xs text-[#EB5757] font-medium">
                        {fileTypeError}
                      </span>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="relative mt-[26px] mb-5 mx-auto w-full flex items-center gap-[4px]">
                  <div className="border-2 border-dashed border-[#C7C9D6] rounded bg-[#A8A8AB1F] py-2 px-3 w-[95%] text-start">
                    <span className="text-xs font-medium text-[#131D26]">
                      {fileDets?.name}
                    </span>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer"
                    onClick={handleDeleteFile}
                  >
                    <path
                      d="M11.0478 5.07365C11.1641 5.07365 11.2696 5.1244 11.353 5.21015C11.4307 5.30173 11.4699 5.41548 11.4585 5.53565C11.4585 5.57531 11.1476 9.50694 10.9701 11.1618C10.8589 12.1774 10.2042 12.794 9.22214 12.8109C8.46704 12.8278 7.72895 12.8337 7.00221 12.8337C6.23065 12.8337 5.47612 12.8278 4.7437 12.8109C3.79457 12.7882 3.13932 12.1605 3.03379 11.1618C2.85112 9.50111 2.5459 5.57531 2.54022 5.53565C2.53455 5.41548 2.57313 5.30173 2.65142 5.21015C2.72857 5.1244 2.83977 5.07365 2.95664 5.07365H11.0478ZM8.20442 1.16699C8.72012 1.16699 9.18079 1.52691 9.31411 2.04023L9.40942 2.46606C9.48657 2.81314 9.78725 3.05872 10.1333 3.05872H11.8342C12.0611 3.05872 12.25 3.24714 12.25 3.48689V3.70855C12.25 3.94246 12.0611 4.13671 11.8342 4.13671H2.16641C1.93892 4.13671 1.75 3.94246 1.75 3.70855V3.48689C1.75 3.24714 1.93892 3.05872 2.16641 3.05872H3.86725C4.21275 3.05872 4.51343 2.81314 4.59115 2.46665L4.68022 2.06882C4.81865 1.52691 5.27421 1.16699 5.79557 1.16699H8.20442Z"
                      fill="#EB5757"
                    />
                  </svg>
                </div>
              )}

              {/* <div className="flex items-center justify-center w-full"> */}
              {/* <button
              type="button"
              onClick={handleSubmit}
              className="w-[90%] rounded-[8px] bg-[#131D26] py-[12px] text-[#fff] text-base font-semibold mx-auto"
            >
              {uploadState} {loading && <CustomSpin />}
            </button> */}
              <div className="flex items-center gap-[12px]">
                {/* <ButtonRounded
              type="button"
              // onClick={handleToggleOtherForms}
              onClick={handleSubmit}
              className="w-auto flex items-center justify-center border-0 rounded-[4px] bg-[#131D26] py-[8px] px-[12px] text-[12px] text-[#F6D155] font-medium my-[8px]"
              text=""
            /> */}
                {files === null ? (
                  <button
                    type="button"
                    className={`w-auto flex items-center justify-center border-0 rounded-[4px] py-[8px] px-[12px] text-[12px]  font-medium my-[8px]  cursor-not-allowed`}
                    style={{
                      backgroundColor: 'rgba(19, 29, 38, 0.3)',
                      color: 'rgba(246, 209, 85, 0.5)',
                    }}
                  >
                    Upload
                  </button>
                ) : userSubPlan === null ? (
                  <button
                    type="button"
                    onClick={handleManageSub}
                    className={`w-auto flex items-center justify-center border-0 rounded-[4px] bg-[#131D26] py-[8px] px-[12px] text-[12px] text-[#F6D155] font-medium my-[8px]  cursor-pointer`}
                  >
                    Upload
                  </button>
                ) : userSubPlan?.data &&
                  userSubPlan?.data?.status === 'canceled' &&
                  resumeListData?.count === 2 ? (
                  <button
                    type="button"
                    onClick={handleManageSub}
                    className={`w-auto flex items-center justify-center border-0 rounded-[4px] bg-[#131D26] py-[8px] px-[12px] text-[12px] text-[#F6D155] font-medium my-[8px]  cursor-pointer`}
                  >
                    Upload
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className={`w-auto flex items-center justify-center border-0 rounded-[4px] bg-[#131D26] py-[8px] px-[12px] text-[12px] text-[#F6D155] font-medium my-[8px]  cursor-pointer`}
                  >
                    Upload {loading && <CustomSpin />}
                  </button>
                )}

                <ButtonRounded
                  type="button"
                  className="w-auto flex items-center justify-center border-0 rounded-[4px] bg-[#A8A8AB33] py-[8px] px-[12px] text-[12px] text-[#131D26] font-medium my-[8px]"
                  text="No, Cancel"
                  onClick={toggleModal}
                />
              </div>
              {/* </div> */}
            </div>
          )}
        </div>
      </div>

      {/* {toggleOtherForms ? (
        <OtherFormsModal
          toggleModal={handleToggleOtherForms}
          handleToggleSuccessModal={handleToggleSuccessModal}
        />
      ) : null} */}
      {/* {toggleSuccessMsg ? (
        <ResumeSubmitedModal toggleModal={handleToggleSuccessModal} />
      ) : null} */}
      <ToastContainer />
    </>
  );
};

export default UploadResumeModal;
