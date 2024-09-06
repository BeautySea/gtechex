import style from './feedback.module.css';

const DiscordCommunity = () => {
  return (
    <div
      className={`flex items-center justify-center h-auto lg:h-[605px] w-full py-20 px-2 ${style.dicourdeBG}`}
    >
      <div className="w-full lg:w-[80%] bg-[#E0E0E01F] h-auto flex items-center justify-center py-2 rounded-[12px]">
        <div className="flex flex-col p-2 lg:p-20 w-full">
          <div className="flex flex-col w-full lg:w-[391px] mx-auto text-center mb-10 h-auto">
            <h2 className="text-[20px] lg:text-[28px] text-[#FFFFFF] font-bold">
              Come join us!
            </h2>
            <p className="text-sm lg:text-[22px] text-[#FFFFFF] font-normal leading-[33px]">
              Join the QuickApply community and stay up to date with new and
              important updates from us
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <button className="bg-[#F6D155] flex items-center justify-between gap-[4px] px-2 lg:px-[20px] py-[12px] text-base text-[#131D26] font-semibold w-auto rounded-[4px]">
              Join Discord Community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscordCommunity;
