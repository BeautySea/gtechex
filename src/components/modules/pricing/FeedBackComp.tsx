import React from 'react';
import style from './feedback.module.css';
import FeedbackCarousel from './FeedbackCarousel';
import avatar from '../../../assets/user1.png';

const FeedBackComp = () => {
  const carouselItem = [
    {
      imageUrl: avatar,
      name: 'Elizabeth Olsen',
      description:
        '“I decided to try out the QuickApply AI platform and I am happy I did, because I have been having interviews back to back and I am now finally hired as a full time Product Designer at HQ Digitals.”',
      country: 'United States',
      category: 'Satisfied user',
    },
    {
      imageUrl: avatar,
      name: 'Elizabeth Swan',
      description:
        '“ Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur distinctio, ratione deserunt fuga enim repellendus. Reiciendis quae, eligendi voluptatem ex omnis dolorem dicta eaque nesciunt facilis necessitatibus repudiandae. Ipsam, odio?”',
      country: 'United States',
      category: 'Satisfied user',
    },
    {
      imageUrl: avatar,
      name: 'Jhon Wick',
      description:
        '“Enim expedita odio perspiciatis eos nulla aperiam ex ea quisquam quaerat? Nam repudiandae iste quos. Ratione, modi optio! Inventore autem nobis quod placeat sapiente tempora vel ex suscipit hic dicta.”',
      country: 'United States',
      category: 'Satisfied user',
    },
  ];
  return (
    <div className={`flex h-auto  mt-10 w-full py-5 bg-landing-page-hero-bg`}>
      <div className="w-full max-w-screen-xl mx-auto px-2 md:px-5  h-auto">
        <div className="w-full lg:w-[625px] h-auto flex flex-col items-center gap-[20px] mx-auto">
          <div className="flex items-center w-auto  justify-center py-[8px] px-[12px] rounded-[40px] bg-[#E7E7E71F] text-[#F6D155] text-base font-semibold">
            Feedbacks
          </div>
          <h1 className="text-[22px] lg:text-[28px] font-bold text-[#E7E7E7] w-full lg:w-[325px] text-center">
            What our users are Saying
          </h1>
          <p className="text-[#E7E7E7] text-sm lg:text-[22px] font-normal text-center leading-[33px]">
            You might have some questions, here are some answers to some of
            those questions
          </p>
        </div>

        <FeedbackCarousel items={carouselItem} />
      </div>
    </div>
  );
};

export default FeedBackComp;
