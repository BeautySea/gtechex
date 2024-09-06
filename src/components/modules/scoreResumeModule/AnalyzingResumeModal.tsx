import React from 'react';
import { LittleBouncingBot } from '../../common/Icons';
interface upgradeProps {
  toggleModal: () => void;
}

const AnalyzingResumeModal = ({ toggleModal }: upgradeProps) => {
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#131d2680] h-screen"
    >
      <div className="relative  w-full max-w-lg max-h-full mx-auto border border-[red] lg:h-[304px]">
        <div className="relative bg-white rounded-lg shadow pt-5 h-full">
          <div className="w-full flex items-center justify-between pl-4">
            {/* <h3 className="text-base text-[#131D26] font-semibold">
              Feature Request
            </h3> */}
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
          <div className="flex flex-col justify-center items-center h-full">
            <div className="flex flex-col w-full items-center justify-center text-center gap-[8px] py-[20px] px-[12px]">
              <LittleBouncingBot />
              <h3 className="text-[#131D26] text-base font-semibold">
                Hold on... We are analyzing your resume.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzingResumeModal;
