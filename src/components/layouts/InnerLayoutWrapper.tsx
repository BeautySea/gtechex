import { ReactNode } from 'react';

interface LayoutwrapperProps {
  children: ReactNode;
}

const InnerLayoutWrapper = ({ children }: LayoutwrapperProps) => {
  return <div className="pt-2.5 pl-[2.5rem] pr-[2.5rem]">{children}</div>;
};

export default InnerLayoutWrapper;
