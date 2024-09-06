import { ReactNode } from 'react';

interface LayoutwrapperProps {
  children: ReactNode;
}
// max-w-[1140px]
const Layoutwrapper = ({ children }: LayoutwrapperProps) => {
  return <div className="flex">{children}</div>;
};

export default Layoutwrapper;
