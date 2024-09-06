import React, { useEffect, useState } from 'react';
import PricingCardTop from '../pricing/PricingCardTop';
import ProfilePriceTitle from './ProfilePriceTitle';
import OtherPlansTab from './OtherPlansTab';
import { ActivatedCheckMark } from '../../common/Icons';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import useAxios from '../../../api/hooks/useAxios';
import paymentAxios from '../../../api/paymentAxios';
import ENUM from '../../../service/enum';
import useAxiosFucntion from '../../../api/hooks/useAxiosFucntion';
import baseAxios from '../../../api/baseAxios';
import TogglePlan from './TogglePlan';

const freePlan: string[] = [
  'AI Score Resume',
  'Apply for 5 jobs on Indeed',
  'Upload as much as 2 resumes for 2 users',
];

const standardPlan: string[] = [
  'Enjoy 10 applications per day',
  'Apply on all platforms',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
];

const premiumPlan: string[] = [
  'Enjoy 20 applications per day',
  'Apply on all platforms',
  'Create unlimited custom CVs',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
];

interface compProps {
  userSubPlan: any;
}
interface standardPlanState {
  isActivePlan: boolean;
}

const OtherPlansComp = ({ userSubPlan }: compProps) => {
  const [togledPlan, setToggledPlan] = useState('Monthly');
  const [stadardPlanState, setStandardPlanState] = useState<standardPlanState>({
    isActivePlan: false,
  });

  const navigate = useNavigate();

  const token = localStorage.getItem('authToken') || '';

  const [productPrices, errorMsg, requestLoading, refreshFucntion] = useAxios({
    axiosInstance: paymentAxios,
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

    console.log('payload', payload);

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
    axiosRequestFucntion({
      axiosInstance: paymentAxios,
      method: 'DELETE',
      url: ENUM.CANCEL_USER_SUBSCRIPTION,
      requestConfig: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  };
  // stadardPlanState, setStandardPlanState
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

  console.log('stadardPlanState', stadardPlanState?.isActivePlan);

  return (
    <div className="w-full flex flex-col space-y-2 mt-[10px] mb-[10px]">
      <div className="flex items-center gap-[12px]">
        <span className="text-[#131D26] text-sm font-semibold leading-5">
          Other Plans
        </span>
        <OtherPlansTab
          togledPlan={togledPlan}
          setToggledPlan={setToggledPlan}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {/* free plan */}
        <div className="bg-[#fff] border border-[#E5E6EC] rounded-[4px]  w-full h-auto">
          <ProfilePriceTitle
            className="py-[12px]"
            title="Free Plan"
            isFree={true}
            price="$0.00"
            togledPlan={togledPlan}
          />

          <div className="flex flex-col justify-between p-3 2xl:h-[auto]">
            <div
              className="flex flex-col gap-[8px] mb-5 h-[209px] 2xl:h-[90
            %]"
            >
              {freePlan.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-start gap-[4px]"
                >
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="0.5"
                      width="20"
                      height="20"
                      rx="10"
                      fill="#131D26"
                      fill-opacity="0.12"
                    />
                    <rect
                      x="0.5"
                      y="1"
                      width="19"
                      height="19"
                      rx="9.5"
                      stroke="#E7E7E7"
                      stroke-opacity="0.08"
                    />
                    <path
                      d="M7.99977 13.7801L5.68644 11.4667C5.56179 11.3421 5.39272 11.272 5.21644 11.272C5.04015 11.272 4.87109 11.3421 4.74644 11.4667C4.62179 11.5914 4.55176 11.7604 4.55176 11.9367C4.55176 12.024 4.56895 12.1104 4.60235 12.1911C4.63576 12.2717 4.68472 12.345 4.74644 12.4067L7.53311 15.1934C7.79311 15.4534 8.2131 15.4534 8.4731 15.1934L15.5264 8.14005C15.6511 8.0154 15.7211 7.84634 15.7211 7.67005C15.7211 7.49377 15.6511 7.3247 15.5264 7.20005C15.4018 7.0754 15.2327 7.00537 15.0564 7.00537C14.8802 7.00537 14.7111 7.0754 14.5864 7.20005L7.99977 13.7801Z"
                      fill="#131D26"
                    />
                  </svg>
                  <span className="text-xs lg:text-sm  text-[#28292A] font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div className="my-[10px]"></div>
            {userSubPlan === null ? (
              <button className="inline-flex items-center justify-center rounded py-[8px] bg-[#2196531F] text-[#219653] text-xs font-medium gap-[4px]">
                <ActivatedCheckMark />
                Activated
              </button>
            ) : userSubPlan !== null &&
              userSubPlan?.data?.details?.status === 'canceled' ? (
              <button className="inline-flex items-center justify-center rounded py-[8px] bg-[#2196531F] text-[#219653] text-xs font-medium gap-[4px]">
                <ActivatedCheckMark />
                Activated
              </button>
            ) : (
              <button
                onClick={handleCanselSubscription}
                className="inline-flex items-center justify-center rounded-[4px] py-[8px] px-[12px] bg-[#131D26] text-[#F6D155] text-xs font-medium  w-full self-end"
              >
                Activate now
              </button>
            )}
          </div>
        </div>
        {/* standard plan */}
        <div
          className={`bg-[#fff] rounded-[4px] w-full h-auto border ${
            stadardPlanState?.isActivePlan === true
              ? 'border-[#E5E6EC]'
              : 'border-[#131D26]'
          }  relative`}
        >
          {stadardPlanState?.isActivePlan === true ? null : (
            <div className="inline-flex w-fitcontent items-center justify-center bg-[#131D26] rounded p-[4px] absolute top-[-10px] left-[12px] border border-[#E5E6EC]">
              <span className="text-[10px] text-[#F8F9FF] font-semibold">
                Most Popular
              </span>
            </div>
          )}

          <ProfilePriceTitle
            className="py-[12px] mt-4"
            title="Standard Plan"
            yearlyPrice="$32,400.00"
            price="$3,000.00"
            discountPricePerMonth="2,700.00"
            togledPlan={togledPlan}
          />

          <div className="flex flex-col justify-between p-3 2xl:h-[auto]">
            <div
              className="flex flex-col gap-[8px] mb-1 h-[209px] 2xl:h-[90
            %]"
            >
              {standardPlan.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-start gap-[4px]"
                >
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="0.5"
                      width="20"
                      height="20"
                      rx="10"
                      fill="#131D26"
                      fill-opacity="0.12"
                    />
                    <rect
                      x="0.5"
                      y="1"
                      width="19"
                      height="19"
                      rx="9.5"
                      stroke="#E7E7E7"
                      stroke-opacity="0.08"
                    />
                    <path
                      d="M7.99977 13.7801L5.68644 11.4667C5.56179 11.3421 5.39272 11.272 5.21644 11.272C5.04015 11.272 4.87109 11.3421 4.74644 11.4667C4.62179 11.5914 4.55176 11.7604 4.55176 11.9367C4.55176 12.024 4.56895 12.1104 4.60235 12.1911C4.63576 12.2717 4.68472 12.345 4.74644 12.4067L7.53311 15.1934C7.79311 15.4534 8.2131 15.4534 8.4731 15.1934L15.5264 8.14005C15.6511 8.0154 15.7211 7.84634 15.7211 7.67005C15.7211 7.49377 15.6511 7.3247 15.5264 7.20005C15.4018 7.0754 15.2327 7.00537 15.0564 7.00537C14.8802 7.00537 14.7111 7.0754 14.5864 7.20005L7.99977 13.7801Z"
                      fill="#131D26"
                    />
                  </svg>
                  <span className="text-xs lg:text-sm  text-[#28292A] font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            {userSubPlan === null ? (
              <button
                type="button"
                onClick={() => handlePurchaseAPlan('standard')}
                className="inline-flex items-center justify-center rounded-[4px] py-[8px] px-[12px] bg-[#131D26] text-[#F6D155] text-xs font-medium"
              >
                Subscribe now
              </button>
            ) : userSubPlan !== null &&
              userSubPlan.data.details?.status === 'canceled' ? (
              <button
                type="button"
                onClick={() => handlePurchaseAPlan('standard')}
                className="inline-flex items-center justify-center rounded-[4px] py-[8px] px-[12px] bg-[#131D26] text-[#F6D155] text-xs font-medium"
              >
                Subscribe now
              </button>
            ) : userSubPlan.data &&
              userSubPlan.data.details?.status === 'active' &&
              userSubPlan.data.details?.items?.data[0]?.price?.lookup_key ===
                'test_standard' ? (
              <button
                className={`inline-flex items-center justify-center rounded py-[8px] ${
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
              userSubPlan.data.details?.items?.data[0]?.price?.lookup_key !==
                'test_standard' ? (
              <button
                type="button"
                onClick={() => handlePurchaseAPlan('standard')}
                className="inline-flex items-center justify-center rounded-[4px] py-[8px] px-[12px] bg-[#131D26] text-[#F6D155] text-xs font-medium w-full"
              >
                Downgrade now
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handlePurchaseAPlan('standard')}
                className="inline-flex items-center justify-center rounded-[4px] py-[8px] px-[12px] bg-[#131D26] text-[#F6D155] text-xs font-medium w-full"
              >
                Subscribe now
              </button>
            )}
          </div>
        </div>
        {/* premium plan */}
        <div className="bg-[#fff] border border-[#E5E6EC] rounded-[4px] w-full h-auto ">
          <ProfilePriceTitle
            className="py-[12px]"
            title="Premium Plan"
            price="$5,000.00"
            yearlyPrice="$56,400.00"
            discountPricePerMonth="4,700.00"
            togledPlan={togledPlan}
          />

          <div className="flex flex-col justify-between p-3 2xl:h-[auto]">
            <div
              className="flex flex-col gap-[8px] mb-5 h-[209px] 2xl:h-[90
            %]"
            >
              {premiumPlan.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-start gap-[4px]"
                >
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="0.5"
                      width="20"
                      height="20"
                      rx="10"
                      fill="#131D26"
                      fill-opacity="0.12"
                    />
                    <rect
                      x="0.5"
                      y="1"
                      width="19"
                      height="19"
                      rx="9.5"
                      stroke="#E7E7E7"
                      stroke-opacity="0.08"
                    />
                    <path
                      d="M7.99977 13.7801L5.68644 11.4667C5.56179 11.3421 5.39272 11.272 5.21644 11.272C5.04015 11.272 4.87109 11.3421 4.74644 11.4667C4.62179 11.5914 4.55176 11.7604 4.55176 11.9367C4.55176 12.024 4.56895 12.1104 4.60235 12.1911C4.63576 12.2717 4.68472 12.345 4.74644 12.4067L7.53311 15.1934C7.79311 15.4534 8.2131 15.4534 8.4731 15.1934L15.5264 8.14005C15.6511 8.0154 15.7211 7.84634 15.7211 7.67005C15.7211 7.49377 15.6511 7.3247 15.5264 7.20005C15.4018 7.0754 15.2327 7.00537 15.0564 7.00537C14.8802 7.00537 14.7111 7.0754 14.5864 7.20005L7.99977 13.7801Z"
                      fill="#131D26"
                    />
                  </svg>
                  <span className="text-xs lg:text-sm text-[#28292A] font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            {userSubPlan === null ? (
              <button
                type="button"
                onClick={() => handlePurchaseAPlan('premium')}
                className="inline-flex items-center justify-center rounded-[4px] py-[8px] px-[12px] bg-[#131D26] text-[#F6D155] text-xs font-medium"
              >
                Subscribe now
              </button>
            ) : userSubPlan !== null &&
              userSubPlan.data.details?.status === 'canceled' ? (
              <button
                type="button"
                onClick={() => handlePurchaseAPlan('premium')}
                className="inline-flex items-center justify-center rounded-[4px] py-[8px] px-[12px] bg-[#131D26] text-[#F6D155] text-xs font-medium"
              >
                Subscribe now
              </button>
            ) : userSubPlan.data &&
              userSubPlan.data.details?.status === 'active' &&
              userSubPlan.data.details?.items?.data[0]?.price?.lookup_key ===
                'test_premium' ? (
              <button
                className={`inline-flex items-center justify-center rounded py-[8px] ${
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
              userSubPlan.data.details?.items?.data[0]?.price?.lookup_key !==
                'test_premium' ? (
              <button
                type="button"
                onClick={() => handlePurchaseAPlan('premium')}
                className="inline-flex items-center justify-center rounded-[4px] py-[8px] px-[12px] bg-[#131D26] text-[#F6D155] text-xs font-medium w-full"
              >
                Upgrade now
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handlePurchaseAPlan('premium')}
                className="inline-flex items-center justify-center rounded-[4px] py-[8px] px-[12px] bg-[#131D26] text-[#F6D155] text-xs font-medium w-full"
              >
                Subscribe now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherPlansComp;
