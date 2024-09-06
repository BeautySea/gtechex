import React, { useState } from 'react';

interface DropdownProps {
  options: string[];
}

const JobStatusComp: React.FC<DropdownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-28 h-10 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {selectedOption || 'Select'}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={`absolute mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
          selectedOption === 'Applied'
            ? 'text-gray-700 bg-white'
            : selectedOption === 'Employed'
            ? 'text-white bg-green-600'
            : selectedOption === 'Rejected'
            ? 'text-white bg-red-600'
            : ''
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {options.map((option) => (
          <button
            key={option}
            className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            role="menuitem"
            onClick={() => handleSelectOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobStatusComp;
