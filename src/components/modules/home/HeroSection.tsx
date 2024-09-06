import React from 'react';
import {
  ArrowLine,
  ChromeLogo,
  HeroBot,
  LandingPageRobot,
  NewHeroLine,
  SmallerStar,
  StartComp,
} from '../../common/Icons';
import style from '../../modules/pricing/feedback.module.css';
import user1 from '../../../assets/herouser1.png';
import user2 from '../../../assets/herouser2.png';
import user3 from '../../../assets/herouser3.png';
import user4 from '../../../assets/herouser4.png';
import JobTitlesCompoent from './JobTitlesCompoent';
import { useNavigate } from 'react-router-dom';

interface compProps {
  token: any;
}

const HeroSection = ({ token }: compProps) => {
  const router = useNavigate();
  const users = [
    {
      image: user1,
      alt: 'user 1',
    },
    {
      image: user2,
      alt: 'user 2',
    },
    {
      image: user3,
      alt: 'user 3',
    },
    {
      image: user4,
      alt: 'user 4',
    },
  ];
  const handleWhichPageToLoad = () => {
    console.log('token', token);

    if (token) {
      router('/overview');
    } else {
      router('/login');
    }
  };
  return (
    // min-h-screen
    <div className="flex flex-col">
      <div className="bg-landing-page-hero-bg bg-cover md:bg-cover lg:bg-cover bg-center ">
        <div className="flex gap-[20px] h-auto">
          <div className="pt-5 hidden lg:block">
            <LandingPageRobot />
          </div>
          <div className="w-[90%]">
            <div className="relative flex flex-col items-center w-full lg:w-[778px] text-white py-10 px-4 md:px-8 lg:px-16 mx-auto">
              <div className="mb-8 lg:max-w-[650px]">
                <h1 className="text-3xl text-[#F8F9FF] md:text-5xl font-bold my-4 text-center">
                  Unlock the power of AI in your job search
                </h1>
                <p className="text-lg md:text-xl text-[#E7E7E7] font-normal text-center">
                  Our AI Platform automates job applications from platforms such
                  as <span className="text-[#F6D155] font-bold">LinkedIn</span>,{' '}
                  <span className="text-[#F6D155] font-bold">Indeed</span>,{' '}
                  <span className="text-[#F6D155] font-bold">Dice</span>, and
                  many more, alleviating the burden of manual application.
                </p>
              </div>
              {/* py-[12px] px-[20px] rounded mb-6 */}
              <div className="flex flex-col gap-[10px] absolute top-[48%]">
                {token ? (
                  <a
                    href="/overview"
                    className="bg-[#F6D155] text-[#131D26] text-base pt-3 pb-3 px-5 rounded mb-6"
                  >
                    Get Started for free ➜
                  </a>
                ) : (
                  <a
                    href="/login"
                    className="bg-[#F6D155] text-[#131D26] text-base py-3 px-5 rounded mb-6"
                  >
                    Get Started for free ➜
                  </a>
                )}

                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {users.map((user) => {
                      return (
                        <img
                          src={user.image}
                          alt={user.alt}
                          className="w-10 h-10 rounded-full border-2 border-[#245497]"
                        />
                      );
                    })}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[#E7E7E7] text-lg font-bold">
                      +20.5k
                    </span>
                    <span className="text-[#C1C1C3] text-sm font-normal">
                      satisfied users
                    </span>
                  </div>
                </div>
              </div>
              <div className=" w-[75%] h-full ">
                <NewHeroLine />
              </div>
              {/* </div> */}
            </div>
          </div>
          {/* <div className="hidden lg:flex items-start justify-end w-[45%] h-screen ">
            <HeroBot />
          </div> */}
        </div>
      </div>
      <div className="flex flex-col gap-[10px] md:flex-row items-center justify-between bg-[#F6D155] py-[13px]">
        <div className="flex items-center justify-between w-full lg:w-[1024px] max-w-[1024px] mx-auto ">
          <p className="text-[#131D26] text-sm md:text-lg font-semibold">
            The Key is in our Chrome Extension
          </p>
          <button className="text-[#F6D155] text-sm md:text-base font-semibold bg-[#131D26] py-[10.5px] px-[20px] flex items-center justify-center gap-[4px] rounded">
            <ChromeLogo />
            Download Chrome Extension
          </button>
        </div>
      </div>
      <JobTitlesCompoent />
    </div>
  );
};

export default HeroSection;
