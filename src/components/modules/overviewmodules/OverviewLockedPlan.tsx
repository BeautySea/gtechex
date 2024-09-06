import SkeletonInput from 'antd/es/skeleton/Input';
import { LockedIcon, UnlockedIcon } from '../../common/Icons';

interface CompProps {
  planType: string;
  userPlan?: any;
  requestLoading: boolean;
}

const OverviewLockedPlan = ({
  planType,
  userPlan,
  requestLoading,
}: CompProps) => {
  // Define allowedPlatforms
  const allowedPlatforms =
    userPlan?.data?.metadata?.permissions?.allowedPlatforms || {};

  // Determine if the plan is unlocked
  // const isUnlocked =
  //   !requestLoading &&
  //   userPlan !== null &&
  //   allowedPlatforms[planType] === 'true';

  function isPlanUnlocked(planType: string) {
    if (requestLoading) {
      // Handle loading state (optional)
      return false; // Or return a separate value to indicate pending state
    }

    if (userPlan === null && planType === 'linkedin') {
      return true;
    }

    const planStatus = userPlan?.data?.details?.status;
    console.log('planStatus', planStatus);

    if (planStatus === 'canceled' && planType === 'linkedin') {
      return true; // Only allow Linkedin for canceled plans
    }

    // Regular check for active plans
    if (planStatus !== 'canceled') {
      return allowedPlatforms[planType] === 'true';
    }
  }

  // console.log('isUnlocked', isUnlocked);

  return (
    <>
      {requestLoading ? (
        <SkeletonInput active />
      ) : userPlan === null && planType === 'linkedin' ? (
        <div className="flex items-center justify-center gap-[4px] rounded-2xl py-[8px] px-[12px] bg-[#BCE0CB]">
          <UnlockedIcon />
          <span className="text-xs text-[#186D3C] font-medium leading-[10px]">
            Unlocked
          </span>
        </div>
      ) : isPlanUnlocked(planType) ? (
        <div className="flex items-center justify-center gap-[4px] rounded-2xl py-[8px] px-[12px] bg-[#BCE0CB]">
          <UnlockedIcon />
          <span className="text-xs text-[#186D3C] font-medium leading-[10px]">
            Unlocked
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-[4px] rounded-2xl py-[8px] px-[12px] bg-[#F9CDCD]">
          <LockedIcon />{' '}
          <span className="text-xs text-[#C41717] font-medium leading-[10px]">
            Locked
          </span>
        </div>
      )}
    </>
  );
};

export default OverviewLockedPlan;
