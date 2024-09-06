import React from 'react';
import style from '../pricing/feedback.module.css';
import { ChromeLogo, StartComp } from '../../common/Icons';

const CallToAction: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-[10px] md:gap-[80px] w-full">
      <div
        className={`flex flex-col gap-[10px] md:gap-[20px] items-center justify-center my-[20px] max-w-[625px] mx-auto`}
      >
        <div className="bg-[#131D26] inline-block text-center py-[8px] px-[12px] rounded-full">
          <span className="text-base text-[#F6D155] font-semibold">Video</span>
        </div>
        <h2 className="text-base md:text-3xl font-bold text-center text-[#131D26] max-w-[438px]">
          An Introductory Video to enhance your decision
        </h2>
      </div>
      <div className="max-w-4xl w-full h-auto md:h-[336px] py-[74px] px-[117px] text-white rounded-lg text-center relative flex flex-col gap-[20px] bg-[#F1F2F2]"></div>
      <div
        className={`w-full max-w-4xl p-2 md:py-[74px] md:px-[117px] text-white rounded-lg text-center relative flex flex-col gap-[20px] bg-landing-page-hero-bg`}
      >
        <div className="hidden md:block absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 ">
          <StartComp />
        </div>
        <div className="hidden md:block absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 ">
          <StartComp />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold ">
          We are taking the{' '}
          <span className="text-yellow-300">stress of applying</span> to
          numerous jobs from you, and{' '}
          <span className="text-yellow-300">entrusting our AI</span> to handle
          the entire process for you.
        </h2>
        <p className="text-lg md:text-xl">So what are you waiting for?</p>
        <div className="flex justify-center gap-4 flex-col md:flex-row">
          <button className="bg-yellow-300 text-blue-900 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-400 transition duration-300">
            Get Started for Free →
          </button>
          <button className="bg-yellow-300 text-blue-900 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-400 transition duration-300 flex items-center">
            <ChromeLogo />
            Download Chrome Extension
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
