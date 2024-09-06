import React, { useState } from 'react';

interface CarouselItem {
  imageUrl: string;
  name: string;
  description: string;
  category: string;
  country: string;
}

const FeedbackCarousel: React.FC<{ items: CarouselItem[] }> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIndex);
  };

  const goToPrevSlide = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(prevIndex);
  };

  return (
    <div className="">
      <div className="mx-auto w-full max-w-xl h-auto bg-[#F0F0F0] rounded-[12px] p-[10px] lg:p-[20px] mt-10">
        <div className="flex items-center justify-start gap-[8px]">
          <img
            src={items[currentIndex].imageUrl}
            alt={items[currentIndex].name}
            className="w-[60px] h-[60px] object-cover rounded-full"
          />

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-[#131D26]">
              {items[currentIndex].name}
            </h3>
            <div className="flex items-center justify-start gap-[8px]">
              <div className="bg-[#131D26] py-[4px] px-1 lg:px-[8px] w-auto flex items-center justify-center rounded-[4px]">
                <span className="text-xs lg:text-sm text-[#F6D155] font-semibold">
                  {items[currentIndex].category}
                </span>
              </div>
              <div className="bg-[#F0F0F0] py-[4px] px-1 lg:px-[8px] w-auto flex items-center justify-center gap-[8px] border border-[#CFCFCF] rounded-[4px]">
                <svg
                  width="16"
                  height="13"
                  viewBox="0 0 16 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1709_61523)">
                    <path d="M0 0.5H16V12.5H0" fill="#BD3D44" />
                    <path
                      d="M0 1.88257H16H0ZM0 3.72507H16H0ZM0 5.57507H16H0ZM0 7.42507H16H0ZM0 9.27507H16H0ZM0 11.1251H16H0Z"
                      fill="black"
                    />
                    <path
                      d="M0 1.88257H16M0 3.72507H16M0 5.57507H16M0 7.42507H16M0 9.27507H16M0 11.1251H16"
                      stroke="white"
                      stroke-width="0.925"
                    />
                    <path d="M0 0.5H9.12V6.9625H0" fill="#192F5D" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1709_61523">
                      <rect
                        width="16"
                        height="12"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <span className="text-xs lg:text-sm text-[#131D26] lg:font-semibold">
                  {items[currentIndex].country}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-start">
          <p className="text-base lg:text-[18px] text-[#131D26] font-semibold">
            {items[currentIndex].description}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-xl flex items-center justify-center gap-[8px] mt-10">
        {/* absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md" */}
        <button
          className=" transform  bg-[#F0F0F0] p-[8px] rounded-md flex items-center justify-center w-[48px] h-[48px]"
          onClick={goToPrevSlide}
        >
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.70709 0.959934C7.89436 1.14743 7.99954 1.4016 7.99954 1.6666C7.99954 1.9316 7.89436 2.18577 7.70709 2.37327L3.08042 6.99993L7.70709 11.6266C7.80534 11.7182 7.88414 11.8286 7.9388 11.9512C7.99345 12.0739 8.02284 12.2063 8.02521 12.3406C8.02758 12.4748 8.00288 12.6082 7.95259 12.7327C7.90229 12.8572 7.82743 12.9704 7.73247 13.0653C7.63751 13.1603 7.5244 13.2351 7.39989 13.2854C7.27537 13.3357 7.142 13.3604 7.00773 13.3581C6.87346 13.3557 6.74104 13.3263 6.61837 13.2716C6.49571 13.217 6.38531 13.1382 6.29376 13.0399L0.960423 7.7066C0.773155 7.5191 0.667969 7.26494 0.667969 6.99993C0.667969 6.73493 0.773155 6.48077 0.960423 6.29327L6.29376 0.959934C6.48126 0.772666 6.73542 0.66748 7.00042 0.66748C7.26542 0.66748 7.51959 0.772666 7.70709 0.959934Z"
              fill="#5A5C5D"
            />
          </svg>
        </button>
        <button
          className=" transform  bg-[#F0F0F0] p-[8px] rounded-md flex items-center justify-center w-[48px] h-[48px]"
          onClick={goToNextSlide}
        >
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.29291 0.959934C1.10564 1.14743 1.00046 1.4016 1.00046 1.6666C1.00046 1.9316 1.10564 2.18577 1.29291 2.37327L5.91958 6.99993L1.29291 11.6266C1.19466 11.7182 1.11586 11.8286 1.0612 11.9512C1.00655 12.0739 0.977158 12.2063 0.974789 12.3406C0.972419 12.4748 0.997119 12.6082 1.04741 12.7327C1.09771 12.8572 1.17257 12.9704 1.26753 13.0653C1.36249 13.1603 1.4756 13.2351 1.60011 13.2854C1.72463 13.3357 1.858 13.3604 1.99227 13.3581C2.12654 13.3557 2.25896 13.3263 2.38163 13.2716C2.50429 13.217 2.61469 13.1382 2.70624 13.0399L8.03958 7.7066C8.22684 7.5191 8.33203 7.26494 8.33203 6.99993C8.33203 6.73493 8.22684 6.48077 8.03958 6.29327L2.70624 0.959934C2.51874 0.772666 2.26458 0.66748 1.99958 0.66748C1.73458 0.66748 1.48041 0.772666 1.29291 0.959934Z"
              fill="#5A5C5D"
            />
          </svg>
        </button>
        {/* absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md */}
      </div>
    </div>
  );
};

export default FeedbackCarousel;
