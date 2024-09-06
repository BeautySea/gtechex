import React from 'react';
import animationData from '../../../../utils/animation/08C3XFnhgR.json';
import Lottie from 'react-lottie';

const AddToChromeAnimation = () => {
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
      <Lottie options={defaultOptions} width={100} />
    </div>
  );
};

export default AddToChromeAnimation;
