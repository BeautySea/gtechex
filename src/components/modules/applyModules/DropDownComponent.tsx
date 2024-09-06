import React, { useState } from 'react';

interface DropdownProps {
  options: string[];
}

const DropdownComp: React.FC<DropdownProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex items-center justify-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <button onClick={handleToggle} className="p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12.0001 13.1724L16.9499 8.22266L18.3641 9.63687L12.0001 16.0009L5.63623 9.63687L7.05044 8.22266L12.0001 13.1724Z"
            fill="#5F5F5F"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-white border rounded shadow-md w-full z-10">
          {options.map((option, index) => (
            <div key={index} className="p-2">
              {option}
            </div>
          ))}
          <button
            className="w-548 py-5 flex-shrink-0 border-dashed border rounded bg-blue-200 w-full border-dashed border-[#9B9B9B]"
            onClick={() => console.log('Button clicked')}
          >
            Add new Resume
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownComp;
