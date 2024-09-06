interface upgradeProps {
  toggleModal: () => void;
}
const UpgradeToPremiumModal = ({ toggleModal }: upgradeProps) => {
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#131d2680]"
    >
      <div className="relative p-4 w-full max-w-md max-h-full mx-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            onClick={toggleModal}
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            <h2 className="text-2xl text-[#000] font-semibold mb-[22px]">
              Oops!
            </h2>
            <h3 className="mb-5 text-base font-normal text-gray-500">
              You cannot apply for jobs again today
            </h3>
            <button
              type="button"
              className="w-[90%] rounded-[28px] bg-[#131D26] py-[12px] text-[#F6D251] text-base font-semibold"
            >
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeToPremiumModal;
