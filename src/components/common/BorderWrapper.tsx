import { ReactNode } from 'react';

interface LayoutwrapperProps {
  children: ReactNode;
  bg?: string;
}

const BorderWrapper = ({ children, bg }: LayoutwrapperProps) => {
  return (
    // max-w-2xl mx-auto xl:w-[714px]
    // my-[6px]
    <div
      className={`px-[20px] py-[20px] border border-[#E5E6EC] rounded-[8px]  mx-auto  bg-[${bg}] `}
    >
      {children}
    </div>
  );
};

export default BorderWrapper;
