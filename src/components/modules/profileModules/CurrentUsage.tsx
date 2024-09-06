import React from 'react';
import ProgressBarComp from '../../common/ProgressBarComp';
import useAxios from '../../../api/hooks/useAxios';
import baseAxios from '../../../api/baseAxios';
import ENUM from '../../../service/enum';
import SkeletonInput from 'antd/es/skeleton/Input';

interface compProps {
  userSubPlan: any;
}

const CurrentUsage = ({ userSubPlan }: compProps) => {
  const token = localStorage.getItem('authToken') || '';
  const [jobApplicationCount, errorMsg, requestLoading, refreshFucntion] =
    useAxios({
      axiosInstance: baseAxios,
      method: 'GET',
      url: ENUM.GET_APPLICATION_COUNT,
      requestConfig: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  // function formatText(array: string[]): string {
  //   if (array.length === 1) {
  //     return array[0];
  //   } else if (array.length === 2) {
  //     return `${array[0]} and ${array[1]}`;
  //   } else if (array.length === 3) {
  //     return `${array[0]}, ${array[1]}, and ${array[2]}`;
  //   } else {
  //     throw new Error('Array length should be 1, 2, or 3');
  //   }
  // }

  function getEnabledPlatforms(platforms: { [key: string]: string }): string {
    let enabled = '';

    for (const [platform, value] of Object.entries(platforms)) {
      if (value === 'true') {
        if (!enabled) {
          enabled = platform;
        } else {
          enabled += `, ${platform}`;
        }
      }
    }
    return enabled;
  }

  function calculatePercentage(used: number, total: number): string {
    if (total <= 0) {
      throw new Error('Total amount must be greater than zero');
    }

    return `${(used / total) * 100}%`;
  }

  return (
    <div className="flex flex-col my-4">
      <div className="flex flex-col gap-1">
        <span className="text-[#131D26] text-sm font-semibold leading-5">
          Current Usage
        </span>
        {userSubPlan === null ? (
          <p className="text-xs text-[#5A5C5D] font-medium">
            Your usage for current plan is shown below
          </p>
        ) : userSubPlan !== null &&
          userSubPlan.data.details?.status === 'canceled' ? (
          <p className="text-xs text-[#5A5C5D] font-medium">
            Your usage for current plan is shown below
          </p>
        ) : (
          <p className="text-xs text-[#5A5C5D] font-medium">
            Your usage resets every month
          </p>
        )}
      </div>
      {/* `${jobApplicationCount?.data?.all} of ${+userSubPlan?.data
                  ?.metadata?.permissions?.maxJobApplicationCount}` */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px] mx-auto w-full h-auto my-2">
        <div className="flex flex-col p-3 gap-3 bg-[#fff] border border-[#E5E6EC] rounded-[4px]">
          <div className="inline-block space-y-1">
            <p className="text-sm text-[#131D26] font-medium">
              Total number of job applications allowed
            </p>
            <span className="text-base text-[#131D26] font-bold">
              {requestLoading ? (
                <SkeletonInput active />
              ) : userSubPlan === null ? (
                `${jobApplicationCount?.data?.all} of 5`
              ) : userSubPlan !== null &&
                userSubPlan.data.details?.status === 'canceled' ? (
                `${jobApplicationCount?.data?.all} of 5`
              ) : (
                `${jobApplicationCount?.data?.all} of ${+userSubPlan?.data
                  ?.metadata?.permissions?.maxJobApplicationCount}`
              )}
            </span>
          </div>
          {/* #E3E4E5 */}
          {requestLoading ? (
            <SkeletonInput active />
          ) : (
            // <ProgressBarComp
            //   width={calculatePercentage(
            //     jobApplicationCount?.data?.all,
            //     +userSubPlan?.data?.metadata?.permissions
            //       ?.maxJobApplicationCount
            //   )}
            //   bg="#219653"
            // />
            <div className={`w-[95%] bg-[#E3E4E5] rounded-full h-1.5`}>
              <div
                className={`bg-[#219653] h-1.5 rounded-full `}
                style={{
                  width: calculatePercentage(
                    jobApplicationCount?.data?.all,
                    +userSubPlan?.data?.metadata?.permissions
                      ?.maxJobApplicationCount
                  ),
                }}
              ></div>
            </div>
          )}
        </div>
        {/* <div className="flex flex-col p-3 gap-3 bg-[#fff] border border-[#E5E6EC] rounded-[4px]">
          <div className="inline-block space-y-1">
            <p className="text-sm text-[#131D26] font-medium">
              Total number of AI custom resume
            </p>
            <span className="text-base text-[#131D26] font-bold">2 of 5</span>
          </div>
          <ProgressBarComp width="65%" bg="#219653" />
        </div> */}
        <div className="flex flex-col p-3 gap-3 bg-[#fff] border border-[#E5E6EC] rounded-[4px]">
          <div className="inline-block space-y-1">
            <p className="text-sm text-[#131D26] font-medium">
              Job platforms allowed
            </p>
            <span className="text-base text-[#131D26] font-bold capitalize">
              {userSubPlan === null
                ? 'LinkedIn'
                : userSubPlan !== null &&
                  userSubPlan?.data?.details?.status === 'canceled'
                ? 'LinkedIn'
                : getEnabledPlatforms(
                    userSubPlan?.data?.metadata?.permissions?.allowedPlatforms
                  )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentUsage;
