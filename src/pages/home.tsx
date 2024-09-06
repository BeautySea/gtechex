import MainFooterComp from '../components/modules/authModule/MainFooterComp';
import ResponsiveAuthHeader from '../components/modules/authModule/ResponsiveAuthHeader';
import CallToAction from '../components/modules/home/CAllToAction';
import CompanyLogosComp from '../components/modules/home/CompanyLogosComp';
import FaqComponent from '../components/modules/home/FaqComponent';
import FeaturesComponent from '../components/modules/home/FeaturesComponent';
import HeroSection from '../components/modules/home/HeroSection';
import HowItWorksComp from '../components/modules/home/HowItWorks';
import NewHeroSection from '../components/modules/home/NewHeroSection';
import SectionTitleComponent from '../components/modules/home/SectionTitleComponent';
import DiscordCommunity from '../components/modules/pricing/DiscordCommunity';
import DownloadExtention from '../components/modules/pricing/DownloadExtention';
import FeedBackComp from '../components/modules/pricing/FeedBackComp';
import PricingCardComp from '../components/modules/pricing/PricingCardComp';

const HomePage = () => {
  const token = localStorage.getItem('authToken') || '';
  return (
    <>
      <div className="flex flex-col w-full h-auto xl:h-screen bg-[#FAFAFA]">
        <ResponsiveAuthHeader token={token} />
        <div className="w-full bg-[#FFFFFF] pt-5">
          <HeroSection token={token} />
          {/* <NewHeroSection /> */}
          <CompanyLogosComp />
          <HowItWorksComp />

          <CallToAction />

          {/* <FeaturesComponent /> */}
          <div className="max-w-6xl mx-auto">
            <SectionTitleComponent
              sectionTitle="Pricing"
              sectionSubTitle="Pricing that suites your unique palette"
              sectionHeaderCont="We have broken down our plans to fit your needs. Whichever subscription plan you choose, you get the best."
            />
            <PricingCardComp />
          </div>
          <FeedBackComp />
          {/* <FaqComponent /> */}
          <DownloadExtention />
          {/* <DiscordCommunity /> */}
          <MainFooterComp />
        </div>
      </div>
    </>
  );
};

export default HomePage;
