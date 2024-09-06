import Layoutwrapper from '../../layouts/layoutwrapper';

interface stateProps {
  text: string;
}
const ResumeEmptyState = ({ text }: stateProps) => {
  return (
    <>
      <Layoutwrapper>
        <div className="w-full flex items-center justify-center mb-[50px]">
          <div className="flex flex-col gap-[40px] w-[80%] md:w-[374px] h-auto">
            <div className="bg-empty-image bg-no-repeat bg-contain bg-center h-[269px]"></div>
            <div className="flex flex-col gap-[20px]">
              <p className="text-[#5F5F5F] text-base font-medium">{text}</p>
              <button className="flex items-center justify-center w-[80%] md:w-[337px] py-[15px] bg-[#131D26] text-[#F6D251] text-base font-medium rounded-[8px]">
                Upload new resume
              </button>
            </div>
          </div>
        </div>
      </Layoutwrapper>
    </>
  );
};

export default ResumeEmptyState;
