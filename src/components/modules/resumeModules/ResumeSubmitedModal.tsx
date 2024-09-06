import ButtonRounded from '../../common/buttons/ButtonRounded';

interface upgradeProps {
  toggleModal: () => void;
}
const ResumeSubmitedModal = ({ toggleModal }: upgradeProps) => {
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
              Your Resume has been uploaded successfully
            </h2>
            <div className="flex items-center gap-[12px] w-full">
              {/* <ButtonRounded
                type="button"
                className="w-full flex items-center justify-center border-0 rounded-[4px] bg-[#0077B5] py-[10px] text-[12px] text-[#F8F9FF] font-medium my-[8px]"
                text="Yes"
              /> */}
              <button
                type="button"
                className="inline-flex items-center justify-center gap-[4px] rounded py-3 px-5 text-xs font-normal leading-4 w-auto bg-[#0077B5] text-[#fff] mx-auto"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.0001 9C13.0014 9.20386 12.9394 9.40311 12.8228 9.57033C12.7062 9.73754 12.5406 9.86451 12.3488 9.93375L9.12072 11.1213L7.93322 14.3469C7.8629 14.5379 7.73567 14.7028 7.5687 14.8193C7.40173 14.9357 7.20305 14.9982 6.99947 14.9982C6.7959 14.9982 6.59722 14.9357 6.43025 14.8193C6.26328 14.7028 6.13605 14.5379 6.06572 14.3469L4.8751 11.125L1.64885 9.9375C1.45781 9.86718 1.29293 9.73995 1.17647 9.57298C1.06 9.406 0.997559 9.20733 0.997559 9.00375C0.997559 8.80017 1.06 8.6015 1.17647 8.43452C1.29293 8.26755 1.45781 8.14032 1.64885 8.07L4.87697 6.8825L6.06447 3.65687C6.1348 3.46583 6.26203 3.30095 6.429 3.18449C6.59597 3.06803 6.79465 3.00558 6.99822 3.00558C7.2018 3.00558 7.40048 3.06803 7.56745 3.18449C7.73442 3.30095 7.86165 3.46583 7.93197 3.65687L9.11947 6.885L12.3451 8.0725C12.5365 8.14077 12.7022 8.26651 12.8195 8.43253C12.9367 8.59856 12.9998 8.79675 13.0001 9ZM9.5001 3H10.5001V4C10.5001 4.13261 10.5528 4.25979 10.6465 4.35355C10.7403 4.44732 10.8675 4.5 11.0001 4.5C11.1327 4.5 11.2599 4.44732 11.3537 4.35355C11.4474 4.25979 11.5001 4.13261 11.5001 4V3H12.5001C12.6327 3 12.7599 2.94732 12.8537 2.85355C12.9474 2.75979 13.0001 2.63261 13.0001 2.5C13.0001 2.36739 12.9474 2.24021 12.8537 2.14645C12.7599 2.05268 12.6327 2 12.5001 2H11.5001V1C11.5001 0.867392 11.4474 0.740215 11.3537 0.646447C11.2599 0.552678 11.1327 0.5 11.0001 0.5C10.8675 0.5 10.7403 0.552678 10.6465 0.646447C10.5528 0.740215 10.5001 0.867392 10.5001 1V2H9.5001C9.36749 2 9.24031 2.05268 9.14655 2.14645C9.05278 2.24021 9.0001 2.36739 9.0001 2.5C9.0001 2.63261 9.05278 2.75979 9.14655 2.85355C9.24031 2.94732 9.36749 3 9.5001 3ZM15.0001 5H14.5001V4.5C14.5001 4.36739 14.4474 4.24021 14.3537 4.14645C14.2599 4.05268 14.1327 4 14.0001 4C13.8675 4 13.7403 4.05268 13.6465 4.14645C13.5528 4.24021 13.5001 4.36739 13.5001 4.5V5H13.0001C12.8675 5 12.7403 5.05268 12.6465 5.14645C12.5528 5.24021 12.5001 5.36739 12.5001 5.5C12.5001 5.63261 12.5528 5.75979 12.6465 5.85355C12.7403 5.94732 12.8675 6 13.0001 6H13.5001V6.5C13.5001 6.63261 13.5528 6.75979 13.6465 6.85355C13.7403 6.94732 13.8675 7 14.0001 7C14.1327 7 14.2599 6.94732 14.3537 6.85355C14.4474 6.75979 14.5001 6.63261 14.5001 6.5V6H15.0001C15.1327 6 15.2599 5.94732 15.3537 5.85355C15.4474 5.75979 15.5001 5.63261 15.5001 5.5C15.5001 5.36739 15.4474 5.24021 15.3537 5.14645C15.2599 5.05268 15.1327 5 15.0001 5Z"
                    fill="#F8F9FF"
                  />
                </svg>
                Score Resume
              </button>
              {/* <ButtonRounded
                type="button"
                className="w-full flex items-center justify-center border-0 rounded-[4px] py-[10px] text-[12px] text-[#131D26] bg-[#A8A8AB33] font-medium my-[8px]"
                text="No"
                onClick={toggleModal}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSubmitedModal;
