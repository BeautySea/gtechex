import React, { useEffect, useState } from 'react';
import { ExcalmationIcon } from '../../common/Icons';

interface currentPlanProps {
  userSubPlan: any;
}
const CurrentPlan = ({ userSubPlan }: currentPlanProps) => {
  const [nextSubPlan, setNextSubPlan] = useState({
    nextSubscriptionDate: '',
    daysRemaining: 0,
  });
  function convertUnixTimestampToDate(
    unixTimestamp: number,
    period: 'month' | 'year'
  ): { nextSubscriptionDate: string; daysRemaining: number } {
    const milliseconds = unixTimestamp * 1000; // Convert to milliseconds
    const currentDate = new Date(milliseconds);

    let nextSubscriptionDate: Date;
    if (period === 'month') {
      // Calculate next month's subscription date with the same day
      nextSubscriptionDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      );
    } else if (period === 'year') {
      // Calculate next year's subscription date with the same date
      nextSubscriptionDate = new Date(
        currentDate.getFullYear() + 1,
        currentDate.getMonth(),
        currentDate.getDate()
      );
    } else {
      throw new Error(
        "Invalid period. Please specify either 'month' or 'year'."
      );
    }

    // Calculate days remaining until the next subscription date
    const timeDifference =
      nextSubscriptionDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Format the next subscription date
    const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = nextSubscriptionDate.toLocaleDateString(
      'en-US',
      options
    );

    return { nextSubscriptionDate: formattedDate, daysRemaining };
  }

  useEffect(() => {
    if (userSubPlan !== null) {
      const result = convertUnixTimestampToDate(
        userSubPlan?.data?.details?.start_date,
        'month'
      );

      setNextSubPlan(result);
    }
  }, [userSubPlan]);

  return (
    <div className="flex flex-col gap-[12px] w-full mt-[10px] mb-[10px] max-w-[610px]">
      <span className="text-[#131D26] text-sm font-semibold leading-5">
        Current Plan
      </span>
      <div className="flex flex-col">
        <div className="w-full p-3 bg-[#131D26] space-y-5 rounded-t">
          <div className="w-full flex justify-between">
            <div className="inline-flex flex-col space-y-1">
              <span className="text-[#F8F9FF] text-xs font-medium capitalize">
                {userSubPlan === null
                  ? 'Free Plan'
                  : userSubPlan !== null &&
                    userSubPlan?.data?.details?.status === 'canceled'
                  ? 'Free Plan'
                  : `${
                      userSubPlan?.data?.details?.items?.data[0]?.price
                        ?.lookup_key === 'test_standard'
                        ? 'Standard'
                        : 'Premium'
                    } Plan`}
              </span>
              <span className="text-[#F8F9FF] text-xl font-bold">
                {userSubPlan === null
                  ? '$0.00'
                  : userSubPlan !== null &&
                    userSubPlan?.data?.details?.status === 'canceled'
                  ? '$0.00'
                  : '$' + userSubPlan?.data?.details?.plan?.amount}
              </span>
            </div>
            <div className="flex gap-[8px]">
              <span className="text-xs text-[#F8F9FF] font-medium mt-1">
                {' '}
                {userSubPlan === null
                  ? ''
                  : userSubPlan !== null &&
                    userSubPlan?.data?.detials?.status === 'canceled'
                  ? ''
                  : userSubPlan?.data?.details?.plan?.interval === 'month'
                  ? 'Monthly'
                  : 'Yearly'}
              </span>
              <div className="inline-flex items-center bg-[#47D78433] py-[4px] px-[8px] h-[26px] rounded-[4px] gap-[4px]">
                <svg
                  width="5"
                  height="6"
                  viewBox="0 0 5 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="2.5" cy="3" r="2.5" fill="#47D784" />
                </svg>
                <span className="text-xs text-[#47D784] font-medium capitalize">
                  {userSubPlan === null
                    ? 'Active'
                    : userSubPlan !== null &&
                      userSubPlan?.data?.details?.status === 'canceled'
                    ? 'Active'
                    : userSubPlan?.data?.details?.status}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-[#F8F9FF33] inline-flex items-center gap-[4px] rounded-[4px] p-[8px]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99967 14.6666C9.84061 14.6666 11.5073 13.9204 12.7137 12.714C13.9201 11.5075 14.6663 9.84085 14.6663 7.99992C14.6663 6.15899 13.9201 4.49232 12.7137 3.28587C11.5073 2.07945 9.84061 1.33325 7.99967 1.33325C6.15874 1.33325 4.49207 2.07945 3.28563 3.28587C2.0792 4.49232 1.33301 6.15899 1.33301 7.99992C1.33301 9.84085 2.0792 11.5075 3.28563 12.714C4.49207 13.9204 6.15874 14.6666 7.99967 14.6666Z"
                fill="#F8F9FF"
                fill-opacity="0.2"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.8041 5.52851C12.0644 5.78886 12.0644 6.21097 11.8041 6.47132L7.80409 10.4713C7.54374 10.7317 7.12163 10.7317 6.86128 10.4713L4.86128 8.47132C4.60093 8.21097 4.60093 7.78886 4.86128 7.52851C5.12163 7.26816 5.54374 7.26816 5.80409 7.52851L7.33268 9.05711L10.8613 5.52851C11.1216 5.26816 11.5437 5.26816 11.8041 5.52851Z"
                fill="white"
                fill-opacity="0.8"
              />
            </svg>

            <span
              className="text-xs font-medium"
              style={{
                color: 'rgba(248, 249, 255, 0.2)',
              }}
            >
              Current Plan
            </span>
          </div>
        </div>
        {/* */}
        {userSubPlan === null ? null : userSubPlan !== null &&
          userSubPlan?.data?.details?.status === 'canceled' ? null : (
          <div className="w-full p-3 bg-[#FFFFFF] border border-[#E5E6EC] flex flex-col rounded-b gap-[12px]">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="text-xs text-[#414343] font-medium">
                  Renewal Date
                </span>
                <h3 className="text-base text-[#EB5757] font-semibold">
                  {nextSubPlan?.nextSubscriptionDate}
                </h3>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#414343] font-medium">
                  Transaction Type
                </span>
                <h3 className="text-base text-[#131D26] font-semibold">
                  Recurring
                </h3>
              </div>
            </div>
            <div className="w-full p-[12px] flex items-center justify-start bg-[#EB57571F] gap-[12px]">
              <ExcalmationIcon />{' '}
              <span className="text-[#414343] text-xs font-medium">
                Your subscription will be automatically renewed for 1 month on{' '}
                <b className="font-bold">
                  ”{nextSubPlan?.nextSubscriptionDate}”
                </b>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentPlan;
