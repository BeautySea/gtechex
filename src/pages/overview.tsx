import { useState } from 'react';
// import ProgressBarComp from '../components/common/ProgressBarComp';
import Linked from '../assets/linked.png';
import Indeed from '../assets/indeed.png';
import Dice from '../assets/dice.png';
// import UpgradeToPremiumModal from '../components/modules/overviewmodules/UpgradeToPremiumModal';
// import OldLayoutWrapper from '../components/layouts/OldLayoutWrapper';
import { useNavigate } from 'react-router';
import JopApplicationCard from '../components/modules/overviewmodules/JopApplicationCard';
import CustomResumeCountCard from '../components/modules/overviewmodules/CustomResumeCountCard';
import DaillyApplicationCountCard from '../components/modules/overviewmodules/DaillyApplicationCountCard';
import UpgradeToStandardModal from '../components/layouts/sidebar/UpgradeToStandardModal';
import Layoutwrapper from '../components/layouts/layoutwrapper';
import InnerLayoutWrapper from '../components/layouts/InnerLayoutWrapper';
import PageSubTitle from '../components/layouts/PageSubTitle';
import { DiceIcon, IndeedIcon, LinkedInIcon } from '../components/common/Icons';
import AIScoreResume from '../components/modules/overviewmodules/AIScoreResume';
import useAxios from '../api/hooks/useAxios';
import ENUM from '../service/enum';
import axios from '../api/baseAxios';
import ReferSomeone from '../components/modules/overviewmodules/ReferSomeone';
import OverviewNoPlanModal from '../components/common/modal/OverviewNoPlanModal';
import OverviewLockedPlan from '../components/modules/overviewmodules/OverviewLockedPlan';
import PurchaseAPlanModal from '../components/common/modal/PurchaseAPlanModal';
import OverviewPageTitle from '../components/layouts/OverviewPageTitle';

const data: {
  logo: string;
  content: string[];
  type: string;
}[] = [
  {
    logo: Linked,
    content: [
      'Over 700 millions members with over 50 million registered companies',
      'The largest social network professional networking and career development',
      'Over 10,000 available jobs to per days',
      'Best platform for recruitment and job seekers to build relationship and get jobs',
    ],
    type: 'linkedin',
  },
  {
    logo: Indeed,
    content: [
      'Over 700 millions members with over 50 million registered companies',
      'The largest social network professional networking and career development',
      'Over 10,000 available jobs to per days',
      'Best platform for recruitment and job seekers to build relationship and get jobs',
    ],
    type: 'indeed',
  },
  {
    logo: Dice,
    content: [
      'Over 700 millions members with over 50 million registered companies',
      'The largest social network professional networking and career development',
      'Over 10,000 available jobs to per days',
      'Best platform for recruitment and job seekers to build relationship and get jobs',
    ],
    type: 'dice',
  },
];

const Overview = () => {
  const token = localStorage.getItem('authToken') || '';
  const [displayModal, setDisplayModal] = useState(false);
  const [toggleNoSubModal, setToggleNoSubModal] = useState(false);
  const [togglePurchaseAPlan, setTogglePurchaseAPlan] = useState(false);
  const [platformType, setPlatformType] = useState('');
  const [togglePremiumUpgrade, setTogglePremiumUpgrade] = useState(false);
  const navigate = useNavigate();

  const [userSubPlan, errorMsg, requestLoading, refreshFucntion] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: ENUM.GET_USER_SUBSCRIPTION_PLAN,
    requestConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  console.log('userSubPlan', userSubPlan);

  const togglePremiumModal = () => {
    setDisplayModal(!displayModal);
  };

  const handleStartApplying = (type: string) => {
    localStorage.setItem('currentPlatform', JSON.stringify(type));
    navigate('/apply', {
      state: { data: type },
    });
  };
  // const handlePurchaseAPlan = () => {
  //   navigate('/account?tab=Manage Subscription');
  // };
  const handlePremiumUpgrade = () => {
    setTogglePremiumUpgrade(!togglePremiumUpgrade);
  };

  const handkleToggleNoPlan = () => {
    setToggleNoSubModal(!toggleNoSubModal);
  };

  const handleTogglePurchaseAPlan = () => {
    setToggleNoSubModal(false);
    setTogglePurchaseAPlan(!togglePurchaseAPlan);
  };

  const allowedPlatforms =
    userSubPlan?.data?.metadata?.permissions?.allowedPlatforms || {};

  // function isPlanUnlocked(planType: string) {
  //   return (
  //     !requestLoading &&
  //     userSubPlan !== null &&
  //     allowedPlatforms[planType] === 'true'
  //   );
  // }

  function isPlanUnlocked(planType: string) {
    if (requestLoading) {
      // Handle loading state (optional)
      return false; // Or return a separate value to indicate pending state
    }

    if (userSubPlan === null && planType === 'linkedin') {
      return true;
    }

    const planStatus = userSubPlan?.data?.details?.status;
    console.log('planStatus', planStatus);

    if (planStatus === 'canceled' && planType === 'linkedin') {
      return true; // Only allow Linkedin for canceled plans
    }

    // Regular check for active plans
    if (planStatus !== 'canceled') {
      return allowedPlatforms[planType] === 'true';
    }
  }

  return (
    <>
      <Layoutwrapper>
        <div className="flex flex-col justify-center  w-full lg:w-[2000px] mx-auto">
          <OverviewPageTitle
            title="Overview"
            needRoute={false}
            includeButton={true}
            btnText={
              userSubPlan === null
                ? 'Purchase Plan'
                : userSubPlan !== null &&
                  userSubPlan.data.details?.status === 'canceled'
                ? 'Purchase Plan'
                : userSubPlan.data &&
                  userSubPlan.data.details?.status === 'active' &&
                  userSubPlan.data.details?.items?.data[0]?.price
                    ?.lookup_key === 'test_premium'
                ? 'Downgrade to Standard'
                : userSubPlan.data &&
                  userSubPlan.data.details?.status === 'active' &&
                  userSubPlan.data.details?.items?.data[0]?.price
                    ?.lookup_key === 'test_standard'
                ? 'Upgrade to Premium'
                : 'Purchase Plan'
            }
            btnClassName="flex items-center justify-center text-[#F6D155] text-xs font-medium rounded bg-[#131D26] py-2 px-3"
            btnType="button"
            btnAction={handleTogglePurchaseAPlan}
            page="overview"
          />
          {/* <PageSubTitle
           
          /> */}
          {/* <InnerLayoutWrapper>
            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-[16px]">
              <AIScoreResume />
              <ReferSomeone />
            </div>
          </InnerLayoutWrapper> */}
          <InnerLayoutWrapper>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[16px] mx-auto mt-[10px] w-full">
              {/* application limit */}
              <DaillyApplicationCountCard />
              {/* cv card */}
              <JopApplicationCard />
              {/* job applications */}
              <CustomResumeCountCard
                userSubPlan={userSubPlan}
                handlePurchaseAPlan={handleTogglePurchaseAPlan}
              />
            </div>

            {/* applied jobs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[16px] mx-auto mt-[25px] mb-7 w-full">
              {data.map((item, i: string | number) => (
                <div
                  className={`flex flex-col w-full max-w-full  h-auto 2xl:h-[427px]  border ${
                    isPlanUnlocked(item?.type)
                      ? 'border-[#131D26]'
                      : 'border-[#9b9b9b66]'
                  } rounded-[8px] pb-[17px] pt-[20px] px-[8px]`}
                  key={i}
                >
                  <div className="flex items-center justify-between w-full mb-[12px] 2xl:mb-[24px] px-[12px]">
                    {item?.type === 'linkedin' ? (
                      <LinkedInIcon />
                    ) : item?.type === 'indeed' ? (
                      <IndeedIcon />
                    ) : (
                      <DiceIcon />
                    )}
                    <OverviewLockedPlan
                      planType={item?.type}
                      userPlan={userSubPlan}
                      requestLoading={requestLoading}
                    />
                  </div>
                  <div className="flex flex-col justify-between h-full">
                    {/* content */}
                    <div>
                      <ul className="marker:text-[#9B9B9B] 2xl:marker:text-[24px] list-outside list-disc ml-6 px-[12px]">
                        {item.content.map((cont, i: string | number) => (
                          <li
                            key={i}
                            className="text-[#131D26] text-sm font-normal my-[4px] "
                          >
                            {cont}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-center mt-7">
                      {userSubPlan === null && item?.type === 'linkedin' ? (
                        <button
                          onClick={() => handleStartApplying(item?.type)}
                          className="w-[95%] rounded-[4px] bg-[#131D26] py-[10px] text-[#F6D251] text-base font-semibold"
                        >
                          Start applying
                        </button>
                      ) : isPlanUnlocked(item?.type) ? (
                        item.type === 'dice' ? (
                          <button
                            // onClick={() => handleStartApplying(item?.type)}
                            className="w-[95%] rounded-[4px] bg-[#131D26] py-[10px] text-[#F6D251] text-base font-semibold cursor-not-allowed"
                          >
                            Coming soon
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStartApplying(item?.type)}
                            className="w-[95%] rounded-[4px] bg-[#131D26] py-[10px] text-[#F6D251] text-base font-semibold"
                          >
                            Start applying
                          </button>
                        )
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            handkleToggleNoPlan();
                            setPlatformType(item?.type);
                          }}
                          className="w-[95%] rounded-[4px] bg-[#131D26] py-[10px] text-[#F6D251] text-base font-semibold"
                        >
                          Start applying
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InnerLayoutWrapper>
        </div>
      </Layoutwrapper>
      {displayModal && (
        <UpgradeToStandardModal toggleModal={togglePremiumModal} />
      )}
      {togglePremiumUpgrade ? (
        <UpgradeToStandardModal
          toggleModal={handlePremiumUpgrade}
          upgradeTo="Upgrade to Premium"
          price="100"
        />
      ) : null}

      {toggleNoSubModal ? (
        <OverviewNoPlanModal
          toggleModal={handkleToggleNoPlan}
          paltform={platformType}
          handlePurchaseAPlan={handleTogglePurchaseAPlan}
        />
      ) : null}

      {togglePurchaseAPlan ? (
        <PurchaseAPlanModal
          toggleModal={handleTogglePurchaseAPlan}
          userSubPlan={userSubPlan}
        />
      ) : null}
    </>
  );
};

export default Overview;
