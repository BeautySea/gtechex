import React from 'react';

const featuresData = [
  {
    id: 1,
    title: 'Tailor your resume to any position effortlessly with AI',
    description: `Don't bother with inserting keywords into your resume. With QuickApply AI, your resume is instantly tailored to match the job description you're applying for with just one click.`,
    buttonText: 'Tailor Resume',
    imageAlt: 'Tailor Resume Image',
  },
  {
    id: 2,
    title: 'Discover Your Resume Score: Your Key To Career Success',
    description: `We've observed many individuals using their resumes to secure jobs only to face disappointment. Thus, we've developed an AI-based method to evaluate applicants' resumes effectively.`,
    buttonText: 'Score Resume',
    imageAlt: 'Score Resume Image',
  },
  {
    id: 3,
    title: 'Build your resume effortlessly with AI',
    description: `Fed up with navigating to a document tool to craft your resume? No need for that anymore. Simply provide us with the desired content for your resume, and our AI will generate it for you.`,
    buttonText: 'Build Resume',
    imageAlt: 'Build Resume Image',
  },
];

const FeaturesComponent: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col gap-[10px] md:gap-[20px] items-center justify-center my-[40px]  mx-auto">
        <div className="bg-[#131D26] inline-block text-center py-[8px] px-[12px] rounded-full">
          <span className="text-sm md:text-lg text-[#F6D155] font-semibold">
            Features
          </span>
        </div>
        <h2 className="text-base md:text-3xl font-bold text-center text-[#131D26]">
          We have added 3 amazing features to enhance your getting hired
        </h2>
        <p className="text-[#414343] text-base md:text-xl font-normal  text-center">
          Not getting hired really sucks! Try these features today and be
          amazed.
        </p>
      </div>
      {featuresData.map((feature, index) => (
        <div
          key={feature.id}
          className="flex flex-col justify-center items-center mb-6 lg:flex-row lg:items-center lg:mb-12 gap-[20px]"
        >
          <div className="w-full lg:w-7/12 flex flex-col items-start justify-center gap-[20px]">
            <div className="flex items-center justify-center bg-[#131D26] py-[6px] px-[14px] rounded-[100%]">
              <span className="text-[#F6D155] text-base font-bold ">
                {index + 1}
              </span>
            </div>
            <h3 className="text-lg lg:text-3xl leading-[48px] font-bold text-[#131D26] ">
              {feature.title}
            </h3>
            <p className="text-[#414343] text-base lg:text-2xl font-normal">
              {feature.description}
            </p>
            <a href="#" className="text-[#414343] text-base lg:text-xl">
              Try out this feature today!
            </a>
            <button className="px-4 py-2 bg-[#131D26] text-[#F6D155] rounded ">
              {feature.buttonText}
            </button>
          </div>
          <div className="w-full lg:w-4/12 md:mt-0">
            <div className="w-full md:w-[432px] md:h-[432px] h-40 bg-gray-200 rounded-[8px]"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesComponent;
