import React from 'react';

const FileInput = () => {
  return (
    <div className="relative">
      <input
        type="file"
        className="hidden"
        id="fileInput"
        accept=".pdf, .doc, .docx"
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer appearance-none border-2 border-dashed border-gray-400 rounded-lg p-2 bg-gray-200 bg-opacity-10 max-w-[297px] w-full flex flex-col items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19ZM13 9V16H11V9H6L12 3L18 9H13Z"
            fill="#5F5F5F"
          />
        </svg>
        <span className="text-gray-600 text-sm font-medium mt-2">
          Click to upload resume
        </span>
      </label>
    </div>
  );
};

export default FileInput;
