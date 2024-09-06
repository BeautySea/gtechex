import React from 'react';
import AddToChromeAnimation from './animation/AddToChromeAnimation';
import AIGetJobsAnimation from './animation/AIGetJobs';
import CreateAccountAnimation from './animation/CreateAccountAnimation';
import ApplyToAll from './animation/ApplyToAll';
import FillRequiredInfo from './animation/FillRequiredInfo';
import RedDotAnimation from './animation/RedDotAnimation';

interface CardProps {
  step: number;
  title: string;
  description: string;
  buttonText?: string;
  imageUrl: string;
  animation?: React.ComponentType;
}

const Card: React.FC<CardProps> = ({
  step,
  title,
  description,
  buttonText,
  imageUrl,
  animation: AnimationComponent,
}) => (
  <div className="bg-[#F0F0F0] rounded-lg p-5 flex flex-col items-start gap-[24px]">
    <div className="flex flex-col items-start gap-[12px]">
      <div className="flex items-center justify-center bg-[#131D26] text-[#F6D155] rounded-full w-8 h-8 text-lg font-bold ">
        {step}
      </div>
      <h3 className="text-2xl font-bold text-[#131D26]">{title}</h3>
      <p className="text-[#414343] text-xs font-normal">{description}</p>
      {buttonText && (
        <button className="bg-[#131D26] text-[#F6D155] px-4 py-2 rounded text-xs font-semibold  transition duration-300">
          {buttonText} →
        </button>
      )}
    </div>
    <div className="w-full lg:max-w-[381.33px] h-auto  flex items-center justify-center">
      {/* render the animation component here */}
      {AnimationComponent && <AnimationComponent />}
    </div>
  </div>
);

const HowItWorksComp: React.FC = () => {
  const steps = [
    {
      step: 1,
      title: 'Create an Account',
      description: 'You can create an account by clicking the button below.',
      buttonText: 'Get Started for free',
      imageUrl: 'https://via.placeholder.com/150',
      animation: CreateAccountAnimation,
    },
    {
      step: 2,
      title: 'Download our Chrome Extension',
      description:
        'Our chrome extension is the backbone of the AI job apply process.',
      buttonText: 'Download Chrome Extension',
      imageUrl: 'https://via.placeholder.com/150',
      animation: AddToChromeAnimation,
    },
    {
      step: 3,
      title: 'Choose Platform you want to apply to jobs from',
      description:
        'We have given you the ability to apply to jobs from platforms like, LinkedIn, Indeed, Dice, etc.',
      imageUrl: 'https://via.placeholder.com/150',
      animation: RedDotAnimation,
    },
    {
      step: 4,
      title: 'Fill in the required information',
      description:
        'Every required field is important in giving the AI the ability to get you the jobs that fit you.',
      imageUrl: 'https://via.placeholder.com/150',
      animation: FillRequiredInfo,
    },
    {
      step: 5,
      title: 'Wait for the AI to get the jobs',
      description:
        'After filling out all the necessary information, let the AI get the jobs that fit you.',
      imageUrl: 'https://via.placeholder.com/150',
      animation: AIGetJobsAnimation,
    },
    {
      step: 6,
      title: 'Apply to all or apply to selected',
      description:
        'The jobs provided by the AI, you can choose whether to apply to all or to some.',
      imageUrl: 'https://via.placeholder.com/150',
      animation: ApplyToAll,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div
        className={`flex flex-col gap-[20px] items-center justify-center my-[40px] max-w-[625px] mx-auto`}
      >
        <div className="bg-[#131D26] inline-block text-center py-[8px] px-[12px] rounded-full">
          <span className="text-base text-[#F6D155] font-semibold">
            How it works
          </span>
        </div>
        <h2 className="text-3xl font-bold text-center text-[#131D26]">
          Step by Step Process <br />
          to Get Started
        </h2>
        <p className="text-[#414343] text-xl font-normal  text-center">
          How our AI Platform transforms your job search
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6">
        {steps.map((step) => (
          <Card key={step.step} {...step} />
        ))}
      </div>
    </div>
  );
};

export default HowItWorksComp;
