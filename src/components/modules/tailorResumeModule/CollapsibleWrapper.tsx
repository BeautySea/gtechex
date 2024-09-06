import React, { useState } from 'react';
import { CollapseDownIcon, RedDeleteButton } from '../../common/Icons';
import BorderWrapper from '../../common/BorderWrapper';

interface CollapsibleWrapperProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleWrapper: React.FC<CollapsibleWrapperProps> = ({
  title,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="px-[24px] py-[10px] border rounded shadow-sm bg-[#fff] border border-[#E5E6EC] w-full lg:w-[546px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#131D26]">{title}</h2>
        <div className="flex space-x-2">
          <button className="bg-[#EB5757] p-2 rounded hover:bg-[#EB5757]">
            <RedDeleteButton />
          </button>
          <button
            className="bg-[#E5E6EC]  p-2 rounded hover:bg-[#E5E6EC]"
            onClick={toggleCollapse}
          >
            {isCollapsed ? <CollapseDownIcon /> : <CollapseDownIcon />}
          </button>
        </div>
      </div>
      {!isCollapsed && <BorderWrapper bg="#fff">{children}</BorderWrapper>}
    </div>
  );
};

export default CollapsibleWrapper;
