import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../utils/animation/Animation - 1707923263389.json';

type props = {
  message: string;
};
const EmptyResumeComp = ({ message }: props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="flex flex-col items-center justify-center w-full bg-[#FFFFFF] border border-[#E5E6EC] py-10 px-5 h-auto  my-5 rounded gap-[20px]">
      <Lottie options={defaultOptions} width={200} />
      <span className="text-xs text-[#414343] font-medium leading-5">
        {message}
      </span>
    </div>
  );
};

export default EmptyResumeComp;
