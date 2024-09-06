import { useEffect, useState } from 'react';
import BorderWrapper from '../../common/BorderWrapper';
import CustomLabel from '../../common/Label';
import ButtonRounded from '../../common/buttons/ButtonRounded';
import OrdinaryCustomLabel from '../../common/OrdinaryCustomLabel';
import useAxiosFucntion from '../../../api/hooks/useAxiosFucntion';
import axios from '../../../api/baseAxios';
import ENUM from '../../../service/enum';
import Spinner from '../../common/spinner/Spinner';
import toast, { Toaster } from 'react-hot-toast';

interface upgradeProps {
  toggleModal: () => void;
}

interface formData {
  featureTitle?: string;
  featureDiscription?: string;
}
const FeatureREquestModal = ({ toggleModal }: upgradeProps) => {
  const token = localStorage.getItem('authToken') || '';
  const [response, errorMsg, requestLoading, axiosRequestFucntion] =
    useAxiosFucntion();
  const [formState, setFormState] = useState<formData>({
    featureTitle: '',
    featureDiscription: '',
  });

  const handleChange = (e: any) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [e.target.name]: e.target.value,
    }));
  };
  const setPayload = () => {
    const payload = {
      title: formState.featureTitle,
      description: formState.featureDiscription,
    };
    return payload;
  };

  const handleApply = (e: any) => {
    console.log('clicked...');
    e.preventDefault();
    const payload = setPayload();
    axiosRequestFucntion({
      axiosInstance: axios,
      method: 'POST',
      url: ENUM.CREATE_FEATURE_REQUEST,
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
      toggleModal();
    }
  }, [response]);

  return (
    <>
      <div
        id="popup-modal"
        tabIndex={-1}
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#131d2680] h-screen"
      >
        {requestLoading ? (
          <Spinner />
        ) : (
          <div className="relative  w-full max-w-lg max-h-full mx-auto">
            <div className="relative bg-white rounded-lg shadow p-5">
              <div className="w-full flex items-center justify-between mb-4">
                <h3 className="text-base text-[#131D26] font-semibold">
                  Feature Request
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
              <div className="">
                <BorderWrapper bg="#fff">
                  <form className="w-full mx-auto">
                    <div className="flex flex-col gap-[20px]">
                      <div className=" w-full">
                        <OrdinaryCustomLabel
                          htmlFor="featureTitle"
                          text="Feature Title"
                          className="block mb-2 text-sm font-medium text-[#5A5C5D] "
                        />
                        <input
                          type="text"
                          id="featureTitle"
                          name="featureTitle"
                          value={formState.featureTitle}
                          onChange={handleChange}
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                          placeholder="What is the name of the feature?"
                          required
                        />
                      </div>
                      <div className=" w-full">
                        <OrdinaryCustomLabel
                          htmlFor="featureDiscription"
                          text="Feature Description"
                          className="block mb-2 text-sm font-medium text-[#5A5C5D] "
                        />
                        <textarea
                          id="featureDiscription"
                          name="featureDiscription"
                          value={formState.featureDiscription}
                          rows={5}
                          cols={40}
                          onChange={handleChange}
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-4"
                          placeholder="Give a brief description about the feature"
                        />
                      </div>
                    </div>
                  </form>
                </BorderWrapper>
                <div className="flex items-center gap-[12px] mt-[1rem]">
                  <button
                    type="button"
                    onClick={handleApply}
                    className="w-auto flex items-center justify-center border-0 rounded-[4px] bg-[#131D26] py-[8px] px-[12px] text-[12px] text-[#F6D155] font-medium my-[8px]"
                  >
                    Submit
                  </button>
                  <ButtonRounded
                    type="button"
                    className="w-auto flex items-center justify-center border-0 rounded-[4px] bg-[#A8A8AB33] py-[8px] px-[12px] text-[12px] text-[#131D26] font-medium my-[8px]"
                    text="No, Cancel"
                    onClick={toggleModal}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default FeatureREquestModal;
