import { useEffect } from 'react';
import axios from '../../../api/baseAxios';
import useAxiosFucntion from '../../../api/hooks/useAxiosFucntion';
import ENUM from '../../../service/enum';
import ButtonRounded from '../../common/buttons/ButtonRounded';
import { useNavigate } from 'react-router';

interface upgradeProps {
  toggleModal: () => void;
}
const DeletProfileModal = ({ toggleModal }: upgradeProps) => {
  const token = localStorage.getItem('authToken') || '';
  const [response, errorMsg, requestLoading, axiosRequestFucntion] =
    useAxiosFucntion();

  const navigate = useNavigate();

  const handleDeleteUserProfile = () => {
    axiosRequestFucntion({
      axiosInstance: axios,
      method: 'DELETE',
      url: ENUM.DELETE_USER_PROFILE,
      requestConfig: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  };

  useEffect(() => {
    if (response?.status === 200) {
      localStorage.removeItem('authToken');
      navigate('/register');
    }
  }, [response]);

  console.log('response', response);

  console.log('errorMsg', errorMsg);

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#131d2680] h-screen"
    >
      <div className="relative p-[20px] w-full max-w-md max-h-full mx-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <button
            type="button"
            onClick={toggleModal}
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
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
          <div className="p-4 md:p-5 text-center">
            <h2 className="text-2xl text-[#000] font-semibold mb-[22px] w-[304px] mx-auto">
              You are about to delete your account
            </h2>
            <h3 className="mb-5 text-base font-normal text-[#EB5757]">
              NOTE: Once your account is Deleted, you can no longer have access
              to it again, all activity on the account will automatically be
              stopped.
            </h3>
            <div className="flex items-center gap-[12px]">
              <ButtonRounded
                type="button"
                onClick={handleDeleteUserProfile}
                className="w-full flex items-center justify-center border-0 rounded-[4px] bg-[#EB5757] py-[10px] text-[12px] text-[#F8F9FF] font-medium my-[8px]"
                text="Yes, Delete"
                isLoading={requestLoading}
              />
              <ButtonRounded
                type="button"
                className="w-full flex items-center justify-center border-0 rounded-[4px] py-[10px] text-[12px] text-[#131D26] bg-[#A8A8AB33] font-medium my-[8px]"
                text="No, Cancel"
                onClick={toggleModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletProfileModal;
