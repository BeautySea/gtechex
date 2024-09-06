import React from 'react';
import { ChromeLogo, LandingPageRobot } from '../../common/Icons';
import JobTitlesCompoent from './JobTitlesCompoent';

const NewHeroSection = () => {
  return (
    <section className="bg-landing-page-hero-bg bg-cover md:bg-cover lg:bg-cover bg-center text-white flex flex-col items-center py-12">
      <div className="pt-5 hidden lg:block">
        <LandingPageRobot />
      </div>
      <div className="container mx-auto flex flex-col items-center text-center px-4 lg:px-0">
        {/* <img src="/path-to-logo.png" alt="AI Logo" className="w-16 h-16 mb-4" /> */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Unlock the power of AI in your job search
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Our AI Platform automates job applications from platforms such as{' '}
          <span className="font-bold">
            LinkedIn, Indeed, Dice, and many more
          </span>
          , alleviating the burden of manual application.
        </p>
        <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full shadow-lg hover:bg-yellow-400 transition mb-4">
          Get Started for free
        </button>
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="flex items-center">
            <img
              src="/path-to-user-avatar1.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="/path-to-user-avatar2.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white -ml-2"
            />
            <img
              src="/path-to-user-avatar3.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white -ml-2"
            />
          </div>
          <span className="text-sm">+20.5k satisfied users</span>
        </div>
      </div>
      {/* <div className="bg-yellow-500 w-full py-2">
        <p className="text-center text-black font-bold">
          The Key is in our Chrome Extension
        </p>
        <button className="bg-black text-white font-bold py-2 px-4 rounded-full mt-4 mx-auto flex items-center justify-center">
          <img
            src="/path-to-chrome-icon.png"
            alt="Chrome Extension"
            className="w-5 h-5 mr-2"
          />
          Download Chrome Extension
        </button>
      </div> */}
      <div className="flex flex-col gap-[10px] md:flex-row items-center justify-between bg-[#F6D155] py-[13px] px-[20px] lg:px-[136px]">
        <p className="text-[#131D26] text-sm md:text-lg font-semibold">
          The Key is in our Chrome Extension
        </p>
        <button className="text-[#F6D155] text-sm md:text-base font-semibold bg-[#131D26] py-[10.5px] px-[20px] flex items-center justify-center gap-[4px] rounded">
          <ChromeLogo />
          Download Chrome Extension
        </button>
      </div>
      <JobTitlesCompoent />
    </section>
  );
};

export default NewHeroSection;
