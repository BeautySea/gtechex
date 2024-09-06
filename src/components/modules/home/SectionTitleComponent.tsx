import React from 'react';

type section =
  | 'FAQ'
  | 'Feedbacks'
  | 'Pricing'
  | 'Features'
  | 'Video'
  | 'How it works';

interface compProps {
  sectionTitle: section;
  sectionSubTitle: string;
  sectionHeaderCont: string;
  width?: number;
}

const SectionTitleComponent = ({
  sectionTitle,
  sectionSubTitle,
  sectionHeaderCont,
  width = 100,
}: compProps) => {
  return (
    <div
      className={`flex flex-col gap-[20px] items-center justify-center my-[40px] max-w-[625px] mx-auto`}
    >
      <div className="bg-[#131D26] inline-block text-center py-[8px] px-[12px] rounded-full">
        <span className="text-base text-[#F6D155] font-semibold">
          {sectionTitle}
        </span>
      </div>
      <h2 className="text-3xl font-bold text-center text-[#131D26]">
        {sectionSubTitle}
      </h2>
      <p className="text-[#414343] text-xl font-normal  text-center">
        {sectionHeaderCont}
      </p>
    </div>
  );
};

export default SectionTitleComponent;
