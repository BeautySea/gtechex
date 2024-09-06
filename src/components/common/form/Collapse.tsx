import React, { useState } from 'react';
import BorderWrapper from '../BorderWrapper';

interface CollapseProps {
  title: string;
  children: any;
}

const Collapse: React.FC<CollapseProps> = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className="bg-[#A8A8AB] px-4 py-2 rounded-b-l-[4px] rounded-b-r-[4px] mb-[12px]">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={toggleCollapse}
        >
          <h2 className="text-xs text-[#131D26] font-medium">{title}</h2>
          <span className="text-gray-500">
            {isCollapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5.31319 13.0205C5.13568 12.843 5.11955 12.5653 5.26478 12.3695L5.31319 12.3134L9.62608 8.00033L5.31319 3.68721C5.13568 3.5097 5.11955 3.23193 5.26478 3.03619L5.31319 2.98011C5.49071 2.8026 5.76848 2.78646 5.96422 2.93169L6.0203 2.98011L10.687 7.64677C10.8645 7.82428 10.8806 8.10206 10.7354 8.2978L10.687 8.35388L6.0203 13.0205C5.82504 13.2158 5.50846 13.2158 5.31319 13.0205Z"
                  fill="#131D26"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M2.97994 5.31344C3.15745 5.13593 3.43523 5.11979 3.63097 5.26503L3.68705 5.31344L8.00016 9.62633L12.3133 5.31344C12.4908 5.13593 12.7686 5.11979 12.9643 5.26503L13.0204 5.31344C13.1979 5.49095 13.214 5.76873 13.0688 5.96447L13.0204 6.02055L8.35372 10.6872C8.1762 10.8647 7.89843 10.8809 7.70269 10.7356L7.64661 10.6872L2.97994 6.02055C2.78468 5.82528 2.78468 5.5087 2.97994 5.31344Z"
                  fill="#131D26"
                />
              </svg>
            )}
          </span>
        </div>
      </div>

      <div>{!isCollapsed && <BorderWrapper>{children}</BorderWrapper>}</div>
    </>
  );
};

export default Collapse;
