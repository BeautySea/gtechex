import { ReactNode } from 'react';
import RobotSvgComp from '../common/robotSvg';
import ResponsiveAuthHeader from '../modules/authModule/ResponsiveAuthHeader';
import SubHeader from '../modules/authModule/SubHeader';

interface LayoutwrapperProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: LayoutwrapperProps) => {
  const token = localStorage.getItem('authToken') || '';
  return (
    <div className="flex flex-col w-full h-auto xl:h-screen bg-[#FBFBFB]">
      {/* <AuthHeader /> */}
      <ResponsiveAuthHeader token={token} />
      <SubHeader />
      {/* <div className="flex items-end justify-center lg:justify-start  lg:pl-[80px] mt-[5px]   relative"> */}
      {/* <div className="flex items-end justify-center lg:justify-start mt-[5px]   relative"> */}
      {/* xl:w-[75%] 2xl:w-[85%] */}
      {/* <div className="w-full lg:w-[80%] 2xl:w-[93%]  flex items-center justify-between "> */}
      <div className="w-full max-w-screen-xl  3xl:max-w-[2000px] flex flex-wrap items-center justify-start mx-auto">
        <div className="w-[80%] flex items-center">
          <div className="hidden md:flex items-end w-auto max-w-[358px] h-auto relative">
            <RobotSvgComp />
          </div>
          {children}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default AuthLayout;
