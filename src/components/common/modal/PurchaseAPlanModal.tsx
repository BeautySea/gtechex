import { Link } from 'react-router-dom';
import {
  ActivatedCheckMark,
  BlueArrow,
  CloseBtnIcon,
  GoldCheckIcon,
  RoundCheckIcon,
} from '../Icons';
import useAxios from '../../../api/hooks/useAxios';
import ENUM from '../../../service/enum';
import axios from '../../../api/paymentAxios';
import useAxiosFucntion from '../../../api/hooks/useAxiosFucntion';
import Spinner from '../spinner/Spinner';
import { useEffect, useState } from 'react';
import baseAxios from '../../../api/baseAxios';
import TogglePlan from '../../modules/profileModules/TogglePlan';

interface upgradeProps {
  toggleModal: () => void;
  userSubPlan?: any;
}

const standardItems: string[] = [
  'Enjoy 10 applications per day',
  'Apply on all platforms',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
];

const premiumItems: string[] = [
  'Enjoy 20 applications per day',
  'Apply on all platforms',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
];

const freePlan: string[] = [
  'AI Score Resume',
  'Apply for 5 jobs on Indeed',
  'Upload as much as 2 resumes for 2 users',
];
interface standardPlanState {
  isActivePlan: boolean;
}
const PurchaseAPlanModal = ({ toggleModal, userSubPlan }: upgradeProps) => {
  const [togledPlan, setToggledPlan] = useState('Monthly');
  const token = localStorage.getItem('authToken') || '';
  const [stadardPlanState, setStandardPlanState] = useState<standardPlanState>({
    isActivePlan: false,
  });

  const [
    response,
    cancelErrorMsg,
    cancelRequestLoading,
    cancelAxiosRequestFucntion,
  ] = useAxiosFucntion();

  const [productPrices, errorMsg, requestLoading, refreshFucntion] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: ENUM.GET_STRIPE_PRICE,
    requestConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const [
    stripeResponse,
    StripeErrorMsg,
    stripeRequestLoading,
    axiosRequestFucntion,
  ] = useAxiosFucntion();

  const setPayload = (planType: string) => {
    // standard
    // premium
    const payload = {
      priceId: productPrices?.status
        ? planType === 'premium'
          ? productPrices?.data[0]?.id
          : productPrices?.data[1]?.id
        : '',
    };
    return payload;
  };
  const handlePurchaseAPlan = (plan: string) => {
    const payload = setPayload(plan);

    axiosRequestFucntion({
      axiosInstance: baseAxios,
      method: 'POST',
      url: ENUM.CREATE_USER_SUBSCRIPTION,
      requestConfig: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      },
    });
  };

  useEffect(() => {
    if (stripeResponse?.status === 200) {
      // console.log('stripeResponse', stripeResponse?.data?.data?.url);
      window.open(stripeResponse?.data?.data?.url, '_blank');
    }
  }, [stripeResponse]);

  const handleCanselSubscription = () => {
    cancelAxiosRequestFucntion({
      axiosInstance: baseAxios,
      method: 'DELETE',
      url: ENUM.CANCEL_USER_SUBSCRIPTION,
      requestConfig: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  };

  useEffect(() => {
    userSubPlan === null
      ? setStandardPlanState({
          ...stadardPlanState,
          isActivePlan: false,
        })
      : userSubPlan !== null && userSubPlan.data.details?.status === 'canceled'
      ? setStandardPlanState({
          ...stadardPlanState,
          isActivePlan: false,
        })
      : userSubPlan.data &&
        userSubPlan.data.details?.status === 'active' &&
        userSubPlan.data.details?.items?.data[0]?.price?.lookup_key ===
          'test_standard'
      ? setStandardPlanState({
          ...stadardPlanState,
          isActivePlan: true,
        })
      : setStandardPlanState({
          ...stadardPlanState,
          isActivePlan: false,
        });
  }, [userSubPlan]);

  console.log('stadardPlanState', stadardPlanState.isActivePlan);

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#131d2680]"
    >
      {stripeRequestLoading ? (
        <Spinner />
      ) : (
        <div className="relative  w-full max-w-[800px] max-h-full mx-auto bg-[#FFFFFF] shadow rounded">
          <div className="relative bg-white rounded-lg p-[20px]">
            <h3 className="text-base text-[#131D26] font-semibold">
              Our Available Plans
            </h3>
            <button
              type="button"
              onClick={toggleModal}
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <CloseBtnIcon />
              <span className="sr-only">Close modal</span>
            </button>
            {/* <div className="flex items-center justify-between gap-[16px] mt-8"> */}
            <div className="w-fit my-[16px]">
              <TogglePlan
                togledPlan={togledPlan}
                setToggledPlan={setToggledPlan}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
              {/* ======================== Free Plan ============================= */}
              <div className="flex flex-col w-full rounded border border-[#E5E6EC] h-[439px]">
                {/* top */}
                <div className="p-[12px] border-b border-[#E5E6EC] flex flex-col items-start relative">
                  <span className="text-xs text-[#131D26] font-medium">
                    Free Plan
                  </span>
                  <h3 className="text-[20px] text-[#131D26] font-bold">0.00</h3>
                  {/* <p className="text-xs text-[#414343] font-medium">
                    Per month
                  </p> */}
                </div>
                <div className="p-[12px] flex flex-col items-start justify-between h-full">
                  <div className="flex flex-col gap-[8px] my-1">
                    {freePlan.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-start gap-[4px]"
                      >
                        <RoundCheckIcon />
                        <span className="text-xs text-[#28292A] font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                  {userSubPlan === null ? (
                    <button className="w-full flex items-center justify-center rounded py-[8px] bg-[#2196531F] text-[#219653] text-xs font-medium gap-[4px]">
                      <ActivatedCheckMark />
                      Activated
                    </button>
                  ) : userSubPlan !== null &&
                    userSubPlan?.data?.details?.status === 'canceled' ? (
                    <button className="w-full flex items-center justify-center rounded py-[8px] bg-[#2196531F] text-[#219653] text-xs font-medium gap-[4px]">
                      <ActivatedCheckMark />
                      Activated
                    </button>
                  ) : (
                    <button
                      onClick={handleCanselSubscription}
                      className="w-full flex items-center justify-center rounded-[4px] py-[8px] px-[12px] bg-[#131D26] text-[#F6D155] text-xs font-medium  w-full self-end"
                    >
                      Activate now
                    </button>
                  )}
                </div>
              </div>
              {/* ======================== Standard Plan ============================= */}
              <div
                className={`flex flex-col w-full rounded border  h-[439px] ${
                  stadardPlanState.isActivePlan === true
                    ? 'bg-[#FFFFFF] border-[#E5E6EC]'
                    : 'bg-[#131D26] border-[#131D26]'
                } `}
              >
                {/* top */}
                {/*  */}
                <div
                  className={`${
                    stadardPlanState.isActivePlan === true
                      ? 'p-[12px]'
                      : 'px-[12px] pt-[24px] pb-[12px]'
                  } border-b border-[#E7E7E714] flex flex-col items-start relative`}
                >
                  {stadardPlanState.isActivePlan === true ? null : (
                    <div className="inline-flex w-fitcontent items-center justify-center bg-[#FFFFFF] rounded p-[4px] absolute top-[-10px] border border-[#E5E6EC]">
                      <span className="text-[10px] text-[#131D26] font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <span
                    className={`text-xs  ${
                      stadardPlanState.isActivePlan === true
                        ? 'text-[#131D26]'
                        : 'text-[#F8F9FF]'
                    } font-medium`}
                  >
                    Standard Plan
                  </span>
                  <h3
                    className={`text-[20px]  ${
                      stadardPlanState.isActivePlan === true
                        ? 'text-[#131D26]'
                        : 'text-[#F8F9FF]'
                    } font-bold`}
                  >
                    {togledPlan === 'Yearly' ? '$32,400.00' : '$3,000.00'}
                  </h3>
                  {togledPlan === 'Yearly' ? (
                    <div className="w-full flex items-center justify-between">
                      <p
                        className={`text-xs ${
                          stadardPlanState.isActivePlan === true
                            ? 'text-[#414343]'
                            : 'text-[#C1C1C3]'
                        }  font-medium`}
                      >
                        Per year
                      </p>
                      <p className="text-xs font-normal text-[#C1C1C3]">
                        <span className="font-bold">$2,700.00</span>/month
                      </p>
                    </div>
                  ) : (
                    <p
                      className={`text-xs ${
                        stadardPlanState.isActivePlan === true
                          ? 'text-[#414343]'
                          : 'text-[#C1C1C3]'
                      }  font-medium`}
                    >
                      Per month
                    </p>
                  )}
                </div>
                <div className="p-[12px] flex flex-col items-start justify-between h-full">
                  {stadardPlanState.isActivePlan === true
                    ? standardItems.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-start gap-[4px] my-1"
                        >
                          <RoundCheckIcon />
                          <span className="text-xs text-[#28292A] font-medium">
                            {item}
                          </span>
                        </div>
                      ))
                    : standardItems.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-start gap-[4px] my-1 "
                        >
                          <GoldCheckIcon />
                          <span className="text-xs text-[#D9D9DB] font-medium">
                            {item}
                          </span>
                        </div>
                      ))}

                  {/* <button
                    type="button"
                    onClick={() => handlePurchaseAPlan('standard')}
                    className="w-full rounded bg-[#131D26] py-[8px] px-[12px] text-[#131D26] bg-[#F6D155] text-base font-semibold self-end"
                  >
                    Subscribe now
                  </button> */}
                  {userSubPlan === null ? (
                    <button
                      type="button"
                      onClick={() => handlePurchaseAPlan('standard')}
                      className="w-full rounded bg-[#131D26] py-[8px] px-[12px] text-[#131D26] bg-[#F6D155] text-base font-semibold self-end"
                    >
                      Subscribe now
                    </button>
                  ) : userSubPlan !== null &&
                    userSubPlan.data.details?.status === 'canceled' ? (
                    <button
                      type="button"
                      onClick={() => handlePurchaseAPlan('standard')}
                      className="w-full rounded bg-[#131D26] py-[8px] px-[12px] text-[#131D26] bg-[#F6D155] text-base font-semibold self-end"
                    >
                      Subscribe now
                    </button>
                  ) : userSubPlan.data &&
                    userSubPlan.data.details?.status === 'active' &&
                    userSubPlan.data.details?.items?.data[0]?.price
                      ?.lookup_key === 'test_standard' ? (
                    <button
                      className={`w-full flex items-center justify-center rounded py-[8px] ${
                        togledPlan === 'Monthly' &&
                        userSubPlan?.data?.details?.plan?.interval === 'month'
                          ? 'bg-[#2196531F] text-[#219653]'
                          : 'text-[#131D26] bg-[#F6D155]'
                      } text-xs font-medium gap-[4px]`}
                    >
                      {togledPlan === 'Monthly' &&
                      userSubPlan?.data?.details?.plan?.interval === 'month' ? (
                        <>
                          {' '}
                          <ActivatedCheckMark />
                          Activated
                        </>
                      ) : (
                        'Upgrade now'
                      )}
                    </button>
                  ) : userSubPlan.data &&
                    userSubPlan.data.details?.status === 'active' &&
                    userSubPlan.data.details?.items?.data[0]?.price
                      ?.lookup_key !== 'test_standard' ? (
                    <button
                      type="button"
                      onClick={() => handlePurchaseAPlan('standard')}
                      className="w-full rounded bg-[#131D26] py-[8px] px-[12px] text-[#131D26] bg-[#F6D155] text-base font-semibold self-end"
                    >
                      Downgrade now
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handlePurchaseAPlan('standard')}
                      className="w-full rounded bg-[#131D26] py-[8px] px-[12px] text-[#131D26] bg-[#F6D155] text-base font-semibold self-end"
                    >
                      Subscribe now
                    </button>
                  )}
                </div>
              </div>
              {/* premium plan */}
              <div className="flex flex-col w-full rounded border border-[#E5E6EC] h-[439px]">
                {/* top */}
                <div className="p-[12px] border-b border-[#E5E6EC] flex flex-col items-start relative">
                  <span className="text-xs text-[#131D26] font-medium">
                    Premium Plan
                  </span>
                  <h3 className="text-[20px] text-[#131D26] font-bold">
                    {togledPlan === 'Yearly' ? '$56,400.00' : '$5,000.00'}
                  </h3>
                  {togledPlan === 'Yearly' ? (
                    <div className="w-full flex items-center justify-between">
                      <p className="text-xs text-[#414343] font-medium">
                        Per year
                      </p>
                      <p className="text-xs font-normal text-[#414343]">
                        <span className="font-bold">$4,700.00</span>/month
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-[#414343] font-medium">
                      Per month
                    </p>
                  )}
                </div>
                <div className="p-[12px] flex flex-col items-start justify-between h-full">
                  {premiumItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-start gap-[4px] my-1"
                    >
                      <RoundCheckIcon />
                      <span className="text-xs text-[#28292A] font-medium">
                        {item}
                      </span>
                    </div>
                  ))}

                  {/* <button
                    type="button"
                    onClick={() => handlePurchaseAPlan('premium')}
                    className="w-full rounded bg-[#131D26] py-[8px] px-[12px] text-[#F6D251] text-base font-semibold self-end"
                  >
                    Subscribe now
                  </button> */}
                  {userSubPlan === null ? (
                    <button
                      type="button"
                      onClick={() => handlePurchaseAPlan('premium')}
                      className="w-full flex items-center justify-center rounded-[4px] py-[8px] px-[12px] bg-[#131D26] text-[#F6D155] text-xs font-medium"
                    >
                      Subscribe now
                    </button>
                  ) : userSubPlan !== null &&
                    userSubPlan.data.details?.status === 'canceled' ? (
                    <button
                      type="button"
                      onClick={() => handlePurchaseAPlan('premium')}
                      className="w-full flex items-center justify-center rounded-[4px] py-[8px] px-[12px] bg-[#131D26] text-[#F6D155] text-xs font-medium"
                    >
                      Subscribe now
                    </button>
                  ) : userSubPlan.data &&
                    userSubPlan.data.details?.status === 'active' &&
                    userSubPlan.data.details?.items?.data[0]?.price
                      ?.lookup_key === 'test_premium' ? (
                    <button
                      className={`w-full flex items-center justify-center rounded py-[8px] ${
                        togledPlan === 'Monthly' &&
                        userSubPlan?.data?.details?.plan?.interval === 'month'
                          ? 'bg-[#2196531F] text-[#219653]'
                          : 'bg-[#131D26] text-[#F6D155]'
                      }  text-xs font-medium gap-[4px]`}
                    >
                      {togledPlan === 'Monthly' &&
                      userSubPlan?.data?.details?.plan?.interval === 'month' ? (
                        <>
                          {' '}
                          <ActivatedCheckMark />
                          Activated
                        </>
                      ) : (
                        'Upgrade now'
                      )}
                    </button>
                  ) : userSubPlan.data &&
                    userSubPlan.data.details?.status === 'active' &&
                    userSubPlan.data.details?.items?.data[0]?.price
                      ?.lookup_key !== 'test_premium' ? (
                    <button
                      type="button"
                      onClick={() => handlePurchaseAPlan('premium')}
                      className="w-full flex items-center justify-center rounded-[4px] py-[8px] px-[12px] bg-[#131D26] text-[#F6D155] text-xs font-medium w-full"
                    >
                      Upgrade now
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handlePurchaseAPlan('premium')}
                      className="w-full flex items-center justify-center rounded-[4px] py-[8px] px-[12px] bg-[#131D26] text-[#F6D155] text-xs font-medium w-full"
                    >
                      Subscribe now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseAPlanModal;
