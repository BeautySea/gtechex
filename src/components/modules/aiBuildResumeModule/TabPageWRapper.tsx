import React from 'react';

interface WrapperComponentProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const TabPageWRapper: React.FC<WrapperComponentProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="w-auto p-5 bg-white flex flex-col gap-3 border border-[#E5E6EC] rounded">
      <div className="flex flex-col gap-1">
        <h2 className="text-base text-black font-semibold">{title}</h2>
        <p className="text-xs text-gray-600 font-medium">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default TabPageWRapper;
