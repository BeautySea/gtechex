import React, { useEffect, useState } from 'react';
import { maskCreditCardNumber } from '../../../utils/utilFucntions';
import useAxiosFucntion from '../../../api/hooks/useAxiosFucntion';
import paymentAxios from '../../../api/paymentAxios';
import ENUM from '../../../service/enum';
import CustomSpin from '../../common/CustomSpin';

interface compProps {
  toggleEditPaymentMethod: () => void;
  toggleChangePaymentModal: () => void;
  userSubPlan: any;
}

const PaymentMethod = ({
  toggleEditPaymentMethod,
  toggleChangePaymentModal,
  userSubPlan,
}: compProps) => {
  const token = localStorage.getItem('authToken') || '';
  const [paidPlan, setPaidPlan] = useState(false);
  const [
    stripeResponse,
    StripeErrorMsg,
    stripeRequestLoading,
    axiosRequestFucntion,
  ] = useAxiosFucntion();

  // const setPayload = () => {
  //   const payload = {
  //     lookup_key: userDatas?.status ? userDatas?.data[0]?.lookup_key : '',
  //   };
  //   return payload;
  // };

  const handlePurchaseAPlan = () => {
    axiosRequestFucntion({
      axiosInstance: paymentAxios,
      method: 'POST',
      url: ENUM.CREATE_PORTAL_SESSION,
      requestConfig: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {},
      },
    });
  };

  useEffect(() => {
    if (stripeResponse?.status === 200) {
      window.open(stripeResponse?.data?.url, '_blank');
    }
  }, [stripeResponse]);

  return (
    <div className="flex flex-col gap-[12px] w-full mt-[10px] my-[20px] max-w-[610px]">
      <div className="flex flex-col">
        {/* <div className="w-[50%] py-3 space-y-5 rounded-t">
          <div className="w-full flex justify-between">
            <div className="inline-flex flex-col space-y-1">
              <span className="text-[#131D26] text-sm font-semibold">
                Payment Method
              </span>
              <span className="text-[#8D8E91] text-xs font-medium">
                Change how you pay for your subscription
              </span>
            </div>
          </div>
          <button
            onClick={toggleChangePaymentModal}
            type="button"
            className="bg-[#A8A8AB66] inline-flex items-center gap-[4px] rounded-[4px] p-[8px] border-0"
          >
            <span className="text-xs font-medium text-[#131D26]">
              Change Payment Method
            </span>
          </button>
        </div> */}
        <div className=" p-3 bg-[#FFFFFF] border border-[#E5E6EC] flex items-center justify-between rounded-b">
          <div className="flex items-center gap-[12px] w-[70%]">
            <div className="flex flex-col">
              <h3 className="text-base text-[#131D26] font-semibold">
                For More Information
              </h3>
              <p className="text-xs text-[#5A5C5D] font-medium">
                Click the button beside for information on your Payment Method,
                Billing Information, Transaction History, etc.
              </p>
            </div>
          </div>
          <button
            onClick={handlePurchaseAPlan}
            className="bg-[#A8A8AB66] flex items-center justify-center gap-[4px] rounded-[4px] py-[8px] px-[14px] border-0 text-xs font-medium text-[#131D26]"
          >
            {/* <span className="text-xs font-medium text-[#131D26]"> */}
            Billing Information
            {stripeRequestLoading ? <CustomSpin spinColor="#131D26" /> : null}
            {/* </span> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
