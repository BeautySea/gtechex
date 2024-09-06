import { ReactNode } from 'react';

interface LayoutwrapperProps {
  children: ReactNode;
}
const OldLayoutWrapper = ({ children }: LayoutwrapperProps) => {
  return (
    <div className="flex pt-6 pl-[1.275rem] pr-[1.125rem]">{children}</div>
  );
};

export default OldLayoutWrapper;
