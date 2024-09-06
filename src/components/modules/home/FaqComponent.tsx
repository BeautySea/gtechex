import React, { useState } from 'react';
import SectionTitleComponent from './SectionTitleComponent';

const faqData = [
  {
    question: 'Is there a trial period available for QuickApply?',
    answer: 'Yes, there is a trial period available.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'Our refund policy is ...',
  },
  {
    question: 'Do I receive automatic updates for the product?',
    answer: 'Yes, you will receive automatic updates.',
  },
  {
    question: 'Will I have support and access to tutorials?',
    answer: 'Yes, support and tutorials are available.',
  },
  { question: 'How does billing work?', answer: 'Billing works by ...' },
  {
    question: 'Are there limits on the number of job applications?',
    answer: 'There are no limits on job applications.',
  },
  {
    question: "Who can benefit from QuickApply's services?",
    answer: 'Anyone looking for jobs can benefit.',
  },
  { question: 'How does QuickApply work?', answer: 'QuickApply works by ...' },
];

const FaqComponent: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 ">
      <SectionTitleComponent
        sectionTitle="FAQ"
        sectionSubTitle=" Frequently Asked Questions"
        sectionHeaderCont="   You might have some questions, here are some answers to some of those
          questions"
      />

      {faqData.map((faq, index) => (
        <div
          key={index}
          className="mb-4 border border-[#E0E0E0] bg-[#F0F0F0] rounded py-[18px] px-[20px]"
        >
          <button
            className="w-full flex justify-between items-center text-lg font-medium text-left focus:outline-none"
            onClick={() => toggleAccordion(index)}
          >
            <span className="text-[#131D26] text-[18px]">{faq.question}</span>
            <span>{activeIndex === index ? '-' : '+'}</span>
          </button>
          {activeIndex === index && (
            <div className="py-2 text-gray-700">{faq.answer}</div>
          )}
        </div>
      ))}
      <div className="mt-8 p-6 bg-[#F0F0F0] flex items-ceter justify-center rounded border border-[#E0E0E0] w-full">
        <div className="max-w-[412px] text-center">
          <p className="mb-4 text-[#131D26] text-3xl font-bold">
            Have more Questions?
          </p>
          <p className="text-[#414343] text-xl font-normal  text-center">
            Reach out to our customer support and we will get back to you ASAP
          </p>
          <a
            href="mailto:info@cloutra.com"
            className="inline-block mt-4 py-2 px-4 bg-[#131D26] text-[#F6D155] rounded"
          >
            info@cloutra.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default FaqComponent;
