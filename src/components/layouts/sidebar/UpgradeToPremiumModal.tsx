import { useState } from 'react';
import ButtonRounded from '../../common/buttons/ButtonRounded';
import { Link } from 'react-router-dom';

interface upgradeProps {
  toggleModal: () => void;
}

interface formData {
  featureTitle?: string;
  featureDiscription?: string;
}

const premiumItems: string[] = [
  '40 job applications per day',
  'Unlimited custom CVs',
  'Score your resume',
];
const UpgradeToPremiumModal = ({ toggleModal }: upgradeProps) => {
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

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#131d2680] h-screen"
    >
      <div className="relative  w-full max-w-md max-h-full mx-auto">
        <div className="relative bg-white rounded-lg shadow p-4">
          <div className="w-full flex items-center justify-between pl-4">
            <div className="flex flex-col gap-[4px]">
              <h3 className="text-base text-[#131D26] font-semibold">
                Upgrade to Premium
              </h3>
              <span className="text-xs text-[#8D8E91] font-medium">
                Per month billed annually
              </span>
            </div>
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
          </div>
          <div className="flex flex-col gap-[16px] w-full p-4">
            <div className="flex items-center justify-start bg-[#E5E6EC] py-[4px] px-[12px] rounded-[4px]">
              <p className="text-sm text-[#131D26] font-medium">
                Price:{' '}
                <span className="text-base font-semibold text-[#131D26]">
                  $100
                </span>
              </p>
            </div>
            <div className="flex flex-col">
              {premiumItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-start gap-[8px] my-1"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.24992 9.43273L3.22576 7.40856C3.11669 7.29949 2.96875 7.23822 2.81451 7.23822C2.66026 7.23822 2.51233 7.29949 2.40326 7.40856C2.29419 7.51763 2.23291 7.66556 2.23291 7.81981C2.23291 7.89619 2.24795 7.97182 2.27718 8.04238C2.30641 8.11294 2.34925 8.17705 2.40326 8.23106L4.84159 10.6694C5.06909 10.8969 5.43659 10.8969 5.66409 10.6694L11.8358 4.49773C11.9448 4.38866 12.0061 4.24073 12.0061 4.08648C12.0061 3.93223 11.9448 3.7843 11.8358 3.67523C11.7267 3.56616 11.5788 3.50488 11.4245 3.50488C11.2703 3.50488 11.1223 3.56616 11.0133 3.67523L5.24992 9.43273Z"
                      fill="#131D26"
                    />
                  </svg>
                  <span className="text-sm text-[#131D26] font-medium">
                    {item}
                  </span>
                </div>
              ))}

              <Link to="#">
                <div className="flex items-center justify-start gap-[8px] my-2">
                  <span className="text-[#0077B5] text-sm font-semibold]">
                    See all features
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.3335 6.84014C2.3335 6.61865 2.49809 6.43561 2.71163 6.40664L2.771 6.40264L10.4617 6.40299L7.68325 3.63593C7.51203 3.46545 7.51144 3.18844 7.68192 3.01722C7.83691 2.86156 8.07993 2.84692 8.25148 2.97363L8.30064 3.01588L11.8298 6.52988C11.8524 6.55236 11.872 6.57668 11.8886 6.60236C11.8933 6.61009 11.8981 6.618 11.9026 6.62607C11.9068 6.63299 11.9106 6.64017 11.9141 6.64743C11.9191 6.65799 11.9239 6.66891 11.9283 6.68004C11.9318 6.68863 11.9348 6.69698 11.9375 6.7054C11.9407 6.71584 11.9439 6.72696 11.9466 6.73825C11.9486 6.74614 11.9502 6.75372 11.9515 6.76134C11.9535 6.77268 11.9551 6.78441 11.9563 6.79628C11.9573 6.80533 11.958 6.8143 11.9583 6.82327C11.9584 6.82872 11.9585 6.83442 11.9585 6.84014L11.9583 6.85709C11.9579 6.86568 11.9574 6.87426 11.9565 6.88281L11.9585 6.84014C11.9585 6.86775 11.9559 6.89476 11.951 6.92095C11.9499 6.92721 11.9486 6.93363 11.9471 6.94002C11.944 6.95319 11.9404 6.96588 11.9362 6.97831C11.9342 6.98449 11.9318 6.99109 11.9293 6.99764C11.9242 7.0108 11.9186 7.02335 11.9125 7.03558C11.9097 7.04132 11.9065 7.04734 11.9032 7.0533C11.8977 7.06301 11.8921 7.07225 11.8861 7.08125C11.8819 7.08762 11.8773 7.09425 11.8724 7.10078L11.8686 7.10582C11.8568 7.12122 11.844 7.13581 11.8304 7.1495L11.8298 7.14991L8.30066 10.6645C8.12946 10.835 7.85245 10.8344 7.68195 10.6632C7.52695 10.5076 7.51333 10.2645 7.64077 10.0935L7.68323 10.0445L10.4605 7.27799L2.771 7.27764C2.52937 7.27764 2.3335 7.08177 2.3335 6.84014Z"
                      fill="#0077B5"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
          <div className="p-4 md:p-5 border-t-2">
            <Link to="#">
              <ButtonRounded
                type="button"
                className="w-full flex items-center justify-center border-0 rounded-[4px] bg-[#131D26] py-[8px] px-[12px] text-[12px] text-[#F6D155] font-medium my-[8px]"
                text="Upgrade to Premium"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeToPremiumModal;
