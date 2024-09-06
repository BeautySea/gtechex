import React from 'react';
import ResumeEmptyState from './ResumeEmptyState';

interface Resume {
  name: string;
  size: number;
}

const resumes: Resume[] = [
  { name: 'John_Doe_Resume.pdf', size: 10 },
  { name: 'Jane_Smith_Resume.pdf', size: 12 },
  { name: 'Alex_Johnson_Resume.pdf', size: 8 },
  { name: 'Emily_Williams_Resume.pdf', size: 14 },
  { name: 'Michael_Brown_Resume.pdf', size: 11 },
  { name: 'Olivia_Martin_Resume.pdf', size: 9 },
  { name: 'Daniel_Taylor_Resume.pdf', size: 13 },
  { name: 'Sophia_Davis_Resume.pdf', size: 15 },
  { name: 'William_Jones_Resume.pdf', size: 7 },
  { name: 'Ava_Anderson_Resume.pdf', size: 10 },
];

// You can use this array in your TypeScript application to generate or refer to sample PDF files with sizes.

const UploadedResume = () => {
  return (
    <div className="flex flex-col gap-[12px] w-full md:w-[626px]">
      {resumes.length > 0 ? (
        resumes.map((item, i) => (
          <div
            key={i}
            className="w-full flex items-center justify-between border border-[#C5C5C5] rounded-[8px] px-7px py-[5px] md:py-[11px] md:px-[14px]"
          >
            <div className="flex items-center gap-[15px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="36"
                viewBox="0 0 32 36"
                fill="none"
              >
                <path
                  d="M0.25 11L10.7556 0.5H29.9962C30.9648 0.5 31.75 1.29679 31.75 2.23565V33.7644C31.75 34.723 30.9714 35.5 30.0115 35.5H1.98845C1.02833 35.5 0.25 34.7127 0.25 33.7381V11ZM12.5 3.125L2.875 12.75H12.5V3.125Z"
                  fill="#131D26"
                />
              </svg>
              <div className="flex flex-col gap-[6px]">
                <h3 className="text-sm text-[#1F1F1F] font-semibold">
                  {item.name}
                </h3>
                <span className="text-[10px] text-[#5F5F5F] font-medium">
                  {item.size}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-[20px]">
              <button
                type="button"
                className="flex items-center justify-center border-0 text-[#5F5F5F] text-sm font-semibold"
              >
                Download
              </button>
              <button
                type="button"
                className="flex items-center justify-center border-0 text-[#5F5F5F] text-sm font-semibold"
              >
                View
              </button>
              <button
                type="button"
                className="flex items-center justify-center border-0 text-[#5F5F5F] text-sm font-semibold"
              >
                Edit
              </button>
              <button
                type="button"
                className="flex items-center justify-center border-0 text-[#DA4404] text-sm font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <ResumeEmptyState text="You have not uploaded any resume" />
      )}
    </div>
  );
};

export default UploadedResume;
