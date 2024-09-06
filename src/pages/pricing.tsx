import React from 'react';
import ResponsiveAuthHeader from '../components/modules/authModule/ResponsiveAuthHeader';
import PricingCardComp from '../components/modules/pricing/PricingCardComp';
import FeedBackComp from '../components/modules/pricing/FeedBackComp';
import DownloadExtention from '../components/modules/pricing/DownloadExtention';
import DiscordCommunity from '../components/modules/pricing/DiscordCommunity';
import MainFooterComp from '../components/modules/authModule/MainFooterComp';

{
  /* <ResponsiveAuthHeader /> */
}
const Pricing = () => {
  const token = localStorage.getItem('authToken') || '';
  return (
    <div className="flex flex-col w-full h-auto xl:h-screen bg-[#FAFAFA]">
      <ResponsiveAuthHeader token={token} />
      <div className="w-full bg-[#FAFAFA] pt-5">
        <div className="flex flex-col  items-center w-full max-w-screen-xl mx-auto px-2 md:px-5  h-auto">
          <div className="w-full lg:w-[625px] h-auto flex flex-col items-center gap-[20px]">
            <div className="flex items-center w-[82px] justify-center py-[8px] px-[12px] rounded-[40px] bg-[#131D26] text-[#F6D155] text-base font-semibold">
              Pricing
            </div>
            <h1 className="text-[24px] lg:text-[28px] font-bold text-[#131D26] w-[325px] text-center">
              Pricing that suites your unique palette
            </h1>
            <p className="text-[18px] lg:text-[#5A5C5D] text-[22px] font-normal text-center">
              We have broken down our plans to fit your needs. Whichever
              subscription plan you choose, you get the best.
            </p>
          </div>
          <PricingCardComp />
        </div>
        <FeedBackComp />
        <DownloadExtention />
        <DiscordCommunity />
        <MainFooterComp />
      </div>
    </div>
  );
};

export default Pricing;
