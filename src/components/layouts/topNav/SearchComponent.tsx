import React from 'react';

interface compProps {
  placeHolder?: string;
  searchSTate?: string;
  inpName?: string;
  handleInputChange?: (e: any) => void;
}

const SearchComponent = ({
  handleInputChange,
  searchSTate,
  inpName,
  placeHolder = 'Search for Anything...',
}: compProps) => {
  return (
    <form className="w-auto">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          name={inpName}
          id={inpName}
          value={searchSTate}
          className="inline-block  px-4 py-2 ps-10 text-xs text-[#414343] border border-[#E5E6EC] rounded bg-[#A8A8AB1F] focus:ring-[#E5E6EC] focus:border-[#E5E6EC]"
          placeholder={placeHolder}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
};

export default SearchComponent;
