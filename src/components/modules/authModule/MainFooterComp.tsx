import React from 'react';
import footLogo from '../../../assets/mobilelogo.svg';
import FooterForm from './FooterForm';
import SocialNetwork from './SocialNetwork';
import { LandingPageFooterLogo } from '../../common/Icons';
import FooterNewsLetterComp from './FooterNewsLetterComp';

const MainFooterComp = () => {
  return (
    <div className="flex flex-col items-center justify-between h-auto w-full lg:px-0 bg-[#131C28]">
      {/* footer top */}
      <div className="w-full lg:w-[80%] flex flex-col lg:flex-row lg:justify-between border-b border-[#E7E7E714] py-8 px-5 gap-[24px]">
        <div className="flex flex-col gap-[4px]">
          <h3 className="text-[#F8F9FF] text-lg lg:text-xl font-semibold">
            Sign up to our Newsletter
          </h3>
          <p className="text-xs lg:text-sm text-[#C1C1C3] font-normal">
            Stay up to date with latest news, announcement, and lots more.
          </p>
        </div>
        <FooterForm />
      </div>

      <div className="w-full lg:w-[80%] mx-auto  h-auto flex flex-col gap-5  items-start md:flex-row md:justify-between py-8 px-5">
        <div className="flex flex-col gap-[40px]">
          <LandingPageFooterLogo />
          <div className="hidden lg:flex flex-col gap-[32px]">
            <SocialNetwork />
          </div>
        </div>
        <div className="flex flex-col gap-[40px] lg:flex-row">
          <div className="flex flex-col gap-[20px]">
            <h3 className="text-base text-[#C1C1C3] font-semibold">Products</h3>
            <ul className="flex flex-col gap-[6px]">
              <li className="text-xs lg:text-base text-[#F8F9FF] font-medium lg:font-semibold">
                AI Tailor Resume
              </li>
              <li className="text-xs lg:text-base text-[#F8F9FF] font-medium lg:font-semibold">
                AI Score Resume
              </li>
              <li className="text-xs lg:text-base text-[#F8F9FF] font-medium lg:font-semibold">
                AI Build Resume
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-[20px]">
            <h3 className="text-base text-[#C1C1C3] font-semibold">Company</h3>
            <ul className="flex flex-col gap-[6px]">
              <li className="text-xs lg:text-base text-[#F8F9FF] font-medium lg:font-semibold">
                Terms & Conditions
              </li>
              <li className="text-xs lg:text-base text-[#F8F9FF] font-medium lg:font-semibold">
                Privacy Policy
              </li>
              <li className="text-xs lg:text-base text-[#F8F9FF] font-medium lg:font-semibold">
                Refund Policy
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <p className="text-[#F8F9FF] text-xs lg:text-base font-semibold">
            Join our Community
          </p>
          <button className="bg-[#F6D155] flex items-center justify-center py-[10px] px-[20px] text-[#131D26] text-xs lg:text-base font-semibold rounded">
            Join Discord Community
          </button>
        </div>
        <div className="flex flex-col gap-[32px] lg:hidden">
          <SocialNetwork />
        </div>
      </div>
      <div className="w-full lg:w-[80%] border-t border-[#E7E7E714] h-auto lg:h-[30px] flex items-center justify-center py-8">
        <div className="w-full mx-auto max-w-screen-xl py-8 px-4 md:flex md:items-center md:justify-between">
          <p className="text-[#E7E7E7] text-xs lg:text-base font-normal">
            Copyright © 2024,{' '}
            <span className="text-[#F6D155] font-semibold">QuickApply.com</span>{' '}
            | All Rights Reserved
          </p>
          {/* <ul className="flex flex-wrap items-center mt-3 text-xs lg:text-base font-medium text-[#C1C1C3]  sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Refund Policy
              </a>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default MainFooterComp;
