import { useState } from 'react';
import ProgressBarComp from '../components/common/ProgressBarComp';
import Linked from '../assets/linked.png';
import Indeed from '../assets/indeed.png';
import Dice from '../assets/dice.png';
import UpgradeToPremiumModal from '../components/modules/overviewmodules/UpgradeToPremiumModal';
import OldLayoutWrapper from '../components/layouts/OldLayoutWrapper';
import { useNavigate } from 'react-router';
import JopApplicationCard from '../components/modules/overviewmodules/JopApplicationCard';
import CustomResumeCountCard from '../components/modules/overviewmodules/CustomResumeCountCard';
import DaillyApplicationCountCard from '../components/modules/overviewmodules/DaillyApplicationCountCard';
import UpgradeToStandardModal from '../components/layouts/sidebar/UpgradeToStandardModal';

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
    type: 'linkedIn',
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
  const [displayModal, setDisplayModal] = useState(false);
  const navigate = useNavigate();

  const togglePremiumModal = () => {
    setDisplayModal(!displayModal);
  };

  const handleStartApplying = (type: string) => {
    navigate('/apply', { state: { data: type } });
  };
  const handlePurchaseAPlan = () => {
    navigate('/pricing');
  };
  return (
    <>
      <OldLayoutWrapper>
        <div className="flex flex-col justify-center items-center w-full lg:w-[2000px] mx-auto px-4">
          {/* overview top */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full mx-auto">
            <h3 className="hidden md:inline-block text-[#1F1F1F] text-2xl font-bold">
              Overview
            </h3>
            <button
              type="button"
              onClick={handlePurchaseAPlan}
              className="w-full sm:w-auto bg-[#1F1F1F] rounded-[4px] py-3 px-[2.54rem] text-[#F6D251] text-base font-semibold flex items-center justify-center "
            >
              Purchase Plan
            </button>
          </div>
          {/* overview top cards */}
          {/* <div className="flex flex-wrap gap-[10px] lg:gap-[45px] items-center justify-center w-full mt-[14px] mx-auto"> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-11 mx-auto mt-[10px] w-full">
            {/* application limit */}
            <DaillyApplicationCountCard />
            {/* cv card */}
            {/* <CustomResumeCountCard /> */}
            {/* job applications */}
            <JopApplicationCard />
          </div>

          {/* applied jobs */}
          {/* md:w-[364px] 2xl:w-[364px] */}
          {/* <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[38px] mb-11"> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-11 mx-auto mt-[25px] mb-7 w-full">
            {data.map((item, i: string | number) => (
              <div
                className="flex flex-col w-full max-w-full  h-auto border border-[#9b9b9b66] rounded-[8px] pb-[17px] pt-[20px] px-[22px]"
                key={i}
              >
                <div className="flex items-center justify-start w-full mb-[12px]">
                  <img src={item.logo} alt="logo" />
                </div>
                {/* content */}
                <div>
                  <ul className="marker:text-[#9B9B9B] list-outside list-disc ml-6">
                    {item.content.map((cont, i: string | number) => (
                      <li
                        key={i}
                        className="text-[#131D26] text-sm font-normal mt-[4px] mb-[4px]"
                      >
                        {cont}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center mt-7">
                  <button
                    // onClick={togglePremiumModal}
                    onClick={() => handleStartApplying(item?.type)}
                    className="w-[90%] rounded-[4px] bg-[#131D26] py-[10px] text-[#F6D251] text-base font-semibold"
                  >
                    Start applying
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </OldLayoutWrapper>
      {displayModal && (
        <UpgradeToStandardModal toggleModal={togglePremiumModal} />
      )}
    </>
  );
};

export default Overview;
