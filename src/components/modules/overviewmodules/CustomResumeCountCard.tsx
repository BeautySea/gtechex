/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import ProgressBarComp from '../../common/ProgressBarComp';
import { myAxiosWithAuthFetchWithPayload } from '../../../api/normalRequest';
import ENUM from '../../../service/enum';
import useCountdownDates from '../../../hooks/useCountdownDates';

interface jobApplicationData {
  all: number;
  this_week: number;
  today: number;
}

interface compProps {
  userSubPlan?: any;
  handlePurchaseAPlan?: () => void;
}
const CustomResumeCountCard = ({
  userSubPlan,
  handlePurchaseAPlan,
}: compProps) => {
  const { startDate, endDate, remainingDays, percentageRemaining } =
    useCountdownDates(
      userSubPlan?.data?.details?.current_period_start,
      userSubPlan?.data?.details?.current_period_end
    );
  const [isLoading, setIsLoading] = useState(false);
  const [nextSubPlan, setNextSubPlan] = useState({
    nextSubscriptionDate: '',
    daysRemaining: 0,
  });
  const token = localStorage.getItem('authToken') || '';
  const [jobData, setJobData] = useState<jobApplicationData>({
    all: 0,
    this_week: 0,
    today: 0,
  });

  const handleFetchData = async () => {
    setIsLoading(true);
    try {
      const method = 'GET';
      const route = ENUM.GET_RESUME_COUNT;
      const resp = await myAxiosWithAuthFetchWithPayload({
        method,
        route,
        token,
      });
      //   console.log('response', resp);
      if (resp?.status === true) {
        setIsLoading(false);
        if (resp?.data) {
          setJobData((prevJobData) => ({
            ...prevJobData,
            all: resp?.data?.all ?? 0,
            this_week: resp?.data?.this_week ?? 0,
            today: resp?.data?.today ?? 0,
          }));
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (token) {
      handleFetchData();
    }
  }, [token]);

  function convertUnixTimestampToDate(
    unixTimestamp: number,
    period: 'month' | 'year'
  ): { nextSubscriptionDate: string; daysRemaining: number } {
    const milliseconds = unixTimestamp * 1000; // Convert to milliseconds
    const currentDate = new Date(); // Get current date

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
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      nextSubscriptionDate.setFullYear(nextSubscriptionDate.getFullYear() + 1);
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
      console.log('result', result);

      setNextSubPlan(result);
    }
  }, [userSubPlan]);

  return (
    <>
      {/* md:w-[364px] 2xl:w-[364px] */}
      <div
        className="flex flex-col h-auto lg:max-h-[124px] gap-[10px] w-full max-w-full  py-[19px] px-[20px] rounded-[8px] shadow-md bg-[#0077B5]"
        style={{
          boxShadow: '0px 29px 16.6px -12px rgba(0, 119, 181, 0.25)',
        }}
      >
        <div className="flex justify-between text-[#F8F9FF] text-xl font-bold ">
          <h3>Current Plan</h3>
          <p className="capitalize">
            {userSubPlan === null
              ? 'Free'
              : userSubPlan !== null &&
                userSubPlan?.data?.details?.status === 'canceled'
              ? 'Free'
              : userSubPlan?.data?.details?.items?.data[0]?.price
                  ?.lookup_key === 'test_standard'
              ? 'Standard'
              : 'Premium'}
            {/* {jobData?.this_week}{' '}
            <span className="text-sm font-medium">this month</span> */}
          </p>
        </div>
        {userSubPlan === null ? (
          <button
            onClick={handlePurchaseAPlan}
            className="inline-flex items-center justify-center text-[#131D26] text-xs font-medium bg-[#F8F9FF] rounded py-[8px] px-[12px] max-w-[106px] mt-5"
          >
            Purchase Plan
          </button>
        ) : userSubPlan !== null &&
          userSubPlan?.data?.details?.status === 'canceled' ? (
          <button
            onClick={handlePurchaseAPlan}
            className="inline-flex items-center justify-center text-[#131D26] text-xs font-medium bg-[#F8F9FF] rounded py-[8px] px-[12px] max-w-[106px] mt-5"
          >
            Purchase Plan
          </button>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-center gap-[4px] text-[#F8F9FF] text-sm">
              <h5 className="font-semibold">{remainingDays} days</h5>
              <span className="font-normal">left for plan to expire</span>
            </div>
            <div className="flex flex-col gap-[6px] mt-[6px]">
              {/* <ProgressBarComp width="65%" bg="#F8F9FF" /> */}
              <div className={`w-full bg-[#ffffff33] rounded-full h-1.5`}>
                <div
                  className={`bg-[#F8F9FF] h-1.5 rounded-full `}
                  style={{
                    width: `${percentageRemaining}%`,
                  }}
                ></div>
              </div>
              <span className="text-[#F8F9FF] text-[10px] font-nromal">
                {/* {jobData?.today} custom AI CVs created today */}
                To be renewed on <b>{endDate}</b>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomResumeCountCard;
