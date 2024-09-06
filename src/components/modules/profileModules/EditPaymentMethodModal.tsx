import { useState } from 'react';
import BorderWrapper from '../../common/BorderWrapper';
import CustomLabel from '../../common/Label';
import ButtonRounded from '../../common/buttons/ButtonRounded';
import OrdinaryCustomLabel from '../../common/OrdinaryCustomLabel';

interface upgradeProps {
  toggleModal: () => void;
}

interface formData {
  cardNumber?: string;
  expireDate?: string;
  cvv: string;
}
const EditPaymentMethodModal = ({ toggleModal }: upgradeProps) => {
  const [formState, setFormState] = useState<formData>({
    cardNumber: '',
    expireDate: '',
    cvv: '',
  });

  const handleChange = (e: any) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleApply = () => {};
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#131d2680] h-screen"
    >
      <div className="relative  w-full max-w-[500px] max-h-full mx-auto">
        <div className="relative bg-white rounded-lg shadow p-4">
          <div className="w-full flex items-center justify-between pl-6">
            <h3 className="text-base text-[#131D26] font-semibold">
              Edit Card Details
            </h3>
            <button
              type="button"
              onClick={toggleModal}
              className="absolute top-3 end-8 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
          <div className="p-4 md:p-5">
            <BorderWrapper bg="#fff">
              <form className="w-full mx-auto" onSubmit={handleApply}>
                <div className="flex flex-col gap-[20px]">
                  <div className=" w-full">
                    <CustomLabel
                      htmlFor="cardNumber"
                      text="Credit/Debit card number"
                      className="block mb-2 text-xs font-medium text-[#5A5C5D] "
                      required={true}
                    />
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formState.cardNumber}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-2 pr-10 placeholder-gray-400 focus:outline-none focus:border-gray-300 text-sm text-[#131D26] font-semibold"
                        placeholder="Enter your credit card number"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg
                          width="36"
                          height="23"
                          viewBox="0 0 36 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_2105_34327)">
                            <path
                              d="M13.1201 2.3999H22.8443V20.0405H13.1201V2.3999Z"
                              fill="#FF5F00"
                            />
                            <path
                              d="M13.7375 11.2202C13.7375 7.636 15.4045 4.45689 17.9667 2.39981C16.0837 0.903815 13.7067 0 11.1136 0C4.97011 0 0 5.01783 0 11.2202C0 17.4224 4.97011 22.4403 11.1135 22.4403C13.7066 22.4403 16.0836 21.5365 17.9667 20.0404C15.4045 18.0145 13.7375 14.8043 13.7375 11.2202Z"
                              fill="#EB001B"
                            />
                            <path
                              d="M35.9637 11.2202C35.9637 17.4224 30.9936 22.4403 24.8503 22.4403C22.2572 22.4403 19.8802 21.5365 17.9971 20.0404C20.5902 17.9834 22.2264 14.8043 22.2264 11.2202C22.2264 7.636 20.5593 4.45689 17.9971 2.39981C19.88 0.903815 22.2572 0 24.8503 0C30.9936 0 35.9637 5.04907 35.9637 11.2202Z"
                              fill="#F79E1B"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2105_34327">
                              <rect width="36" height="23" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-[12px]">
                    <div className=" w-1/2">
                      <CustomLabel
                        htmlFor="expireDate"
                        required={true}
                        text="Expiration Month and Year"
                        className="block mb-2 text-xs font-medium text-gray-900"
                      />
                      <input
                        type="text"
                        id="expireDate"
                        name="expireDate"
                        value={formState.expireDate}
                        onChange={handleChange}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                        placeholder="e.g Frontend Engineer"
                        required
                      />
                    </div>
                    <div className="mb-2 w-1/2">
                      <CustomLabel
                        htmlFor="cvv"
                        required={true}
                        text="CVV"
                        className="block mb-2 text-xs font-medium text-gray-900"
                      />
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formState.cvv}
                        onChange={handleChange}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                        placeholder="e.g United States"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </BorderWrapper>
            <div className="flex items-center gap-[12px]">
              <ButtonRounded
                type="button"
                className="w-auto flex items-center justify-center border-0 rounded-[4px] bg-[#131D26] py-[8px] px-[12px] text-[12px] text-[#F6D155] font-medium my-[8px]"
                text="Update"
              />
              <ButtonRounded
                type="button"
                className="w-auto flex items-center justify-center border-0 rounded-[4px] bg-[#A8A8AB33] py-[8px] px-[12px] text-[12px] text-[#131D26] font-medium my-[8px]"
                text="Cancel"
                onClick={toggleModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPaymentMethodModal;
