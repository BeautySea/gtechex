import React from 'react';
import ProgressBarComp from '../../common/ProgressBarComp';

const DaillyApplicationCountCard = () => {
  // 2xl:w-[364px]
  return (
    <>
      <div
        className="flex flex-col h-auto lg:max-h-[124px] gap-[10px] w-full max-w-full p-[20px] rounded-[8px] shadow-md bg-[#131D26] "
        style={{
          // boxShadow: '0px 29px 16.6px -12px rgba(0, 119, 181, 0.25)',
          boxShadow: '0px 29px 16.6px -12px #131D2640',
        }}
      >
        {/* #96760040 */}
        <div className="flex justify-between text-[#fff] text-xl font-semibold ">
          <h3>Daily application limit</h3>
          <span>154</span>
        </div>
        <div className="flex flex-col gap-[6px]">
          <div className="flex items-center gap-[4px]">
            <h5 className="font-semibold text-[#fff] text-sm">120</h5>
            <span className="font-normal text-[#fff] text-sm">
              left for today
            </span>
          </div>
          <div className="flex flex-col gap-[6px]">
            {/* <ProgressBarComp width="45%" bg="#F6D251" progBG="#ffffff33" /> */}
            <div className={`w-full bg-[#ffffff33] rounded-full h-1.5`}>
              <div
                className={`bg-[#F6D251] h-1.5 rounded-full `}
                style={{ width: '45%' }}
              ></div>
            </div>
            <span className="text-[#fff] text-[10px] font-normal">
              34 applications today
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DaillyApplicationCountCard;
