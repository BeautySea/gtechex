interface upgradeProps {
  toggleModal: () => void;
  message: string;
}
const SuccessModal = ({ toggleModal, message }: upgradeProps) => {
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#131d2680] h-screen"
    >
      <div className="relative px-5 py-2.5 w-full max-w-md max-h-full mx-auto">
        <div className="relative bg-white rounded-lg shadow">
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
          <div className="p-4 md:p-5 text-center w-full flex flex-col items-center gap-[8px]  h-auto ">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.0002 36.6663C24.6025 36.6663 28.7692 34.8008 31.7852 31.7848C34.8013 28.7687 36.6668 24.602 36.6668 19.9997C36.6668 15.3973 34.8013 11.2307 31.7852 8.21456C28.7692 5.19849 24.6025 3.33301 20.0002 3.33301C15.3978 3.33301 11.2312 5.19849 8.21505 8.21456C5.19898 11.2307 3.3335 15.3973 3.3335 19.9997C3.3335 24.602 5.19898 28.7687 8.21505 31.7848C11.2312 34.8008 15.3978 36.6663 20.0002 36.6663Z"
                fill="#219653"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M29.5122 13.8212C30.163 14.472 30.163 15.5273 29.5122 16.1782L19.5122 26.1782C18.8613 26.8291 17.806 26.8291 17.1551 26.1782L12.1551 21.1782C11.5043 20.5273 11.5043 19.472 12.1551 18.8212C12.806 18.1703 13.8613 18.1703 14.5122 18.8212L18.3337 22.6427L27.1551 13.8212C27.806 13.1703 28.8613 13.1703 29.5122 13.8212Z"
                fill="white"
              />
            </svg>

            <h2 className="text-base text-[#000] font-semibold mb-[22px] w-[304px] mx-auto">
              {message}
            </h2>
            <div className="flex items-center gap-[12px] w-full">
              <button
                type="button"
                onClick={toggleModal}
                className="inline-flex items-center justify-center gap-[4px] rounded py-3 px-5 text-xs font-normal leading-4 w-auto bg-[#0077B5] text-[#fff] mx-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
